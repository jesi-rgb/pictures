import { getPayload } from 'payload'
import config from '../payload.config.js'
import fs from 'node:fs'
import path from 'node:path'
import exifr from 'exifr'
import type { Photo } from '../payload-types.js'

async function syncPhotos() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const photosDir = path.join(process.cwd(), 'photos')

  if (!fs.existsSync(photosDir)) {
    console.error('Photos directory not found:', photosDir)
    return
  }

  const files = fs.readdirSync(photosDir)
  const originalFiles = files.filter(
    (file) =>
      !file.includes('-') ||
      (file.includes('.JPG') && !file.match(/-\d+x\d+/)) ||
      (file.includes('.jpg') && !file.match(/-\d+x\d+/)),
  )

  console.log(`Found ${originalFiles.length} original photos to sync`)

  for (const filename of originalFiles) {
    const filePath = path.join(photosDir, filename)

    const existing = await payload.find({
      collection: 'photos',
      where: {
        filename: { equals: filename },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`Skipping ${filename} - already in database`)
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(filePath)
      const fileStats = fs.statSync(filePath)

      const exifData = await exifr.parse(filePath, {
        tiff: true,
        exif: true,
        gps: true,
        interop: true,
      })

      const photoData: Omit<Photo, 'id' | 'sizes' | 'createdAt' | 'updatedAt'> &
        Partial<Pick<Photo, 'sizes'>> = {
        alt: filename.replace(/\.(jpg|JPG)$/, ''),
      }

      if (exifData) {
        if (exifData.ISO) photoData.iso = exifData.ISO

        if (exifData.ExposureTime) {
          const exposureTime = exifData.ExposureTime
          photoData.shutterSpeed =
            exposureTime < 1 ? `1/${Math.round(1 / exposureTime)}` : `${exposureTime}s`
        }

        if (exifData.FNumber) {
          photoData.aperture = `f/${exifData.FNumber.toFixed(1)}`
        }

        if (exifData.FocalLength) {
          photoData.focalLength = Math.round(exifData.FocalLength)
        }

        if (exifData.Make && exifData.Model) {
          photoData.camera = `${exifData.Make} ${exifData.Model}`.trim()
        } else if (exifData.Model) {
          photoData.camera = exifData.Model
        }

        if (exifData.LensModel) {
          photoData.lens = exifData.LensModel
        }

        if (exifData.DateTimeOriginal) {
          photoData.dateTaken = exifData.DateTimeOriginal.toISOString()
        } else if (exifData.DateTime) {
          photoData.dateTaken = exifData.DateTime.toISOString()
        }

        if (exifData.latitude && exifData.longitude) {
          photoData.latitude = exifData.latitude
          photoData.longitude = exifData.longitude
        }

        if (exifData.WhiteBalance !== undefined) {
          const wbModes = ['Auto', 'Manual']
          photoData.whiteBalance = wbModes[exifData.WhiteBalance] || 'Unknown'
        }

        if (exifData.Flash !== undefined) {
          photoData.flash = exifData.Flash & 1 ? 'Fired' : 'Did not fire'
        }
      }

      await payload.create({
        collection: 'photos',
        data: photoData as never,
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          name: filename,
          size: fileStats.size,
        },
        draft: false,
      })

      console.log(`✓ Synced ${filename}`)
    } catch (error) {
      console.error(`✗ Error syncing ${filename}:`, error)
    }
  }

  console.log('Sync complete!')
  process.exit(0)
}

syncPhotos().catch((error) => {
  console.error('Sync failed:', error)
  process.exit(1)
})
