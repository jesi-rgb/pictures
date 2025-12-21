import { getPayload } from 'payload'
import config from '../payload.config.js'
import fs from 'node:fs'
import path from 'node:path'

async function fixDuplicateFilenames() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const photosDir = path.join(process.cwd(), 'photos')

  // Get all photos from database
  const allPhotos = await payload.find({
    collection: 'photos',
    limit: 1000,
  })

  console.log(`Found ${allPhotos.docs.length} photos in database`)

  let fixed = 0
  let errors = 0

  for (const photo of allPhotos.docs) {
    const filename = (photo as { filename?: string }).filename

    if (!filename) {
      continue
    }

    // Check if filename has the -1, -2, -3, etc. pattern (any number)
    const match = filename.match(/^(.+)-\d+(\.(jpg|JPG))$/)
    if (match) {
      const baseName = match[1]
      const extension = match[2]
      const correctFilename = `${baseName}${extension}`

      // Check if the correct file exists on disk
      const correctFilePath = path.join(photosDir, correctFilename)
      if (fs.existsSync(correctFilePath)) {
        try {
          // Update the photo record with the correct filename
          await payload.update({
            collection: 'photos',
            id: photo.id,
            data: {
              filename: correctFilename,
            } as never,
          })

          console.log(`✓ Fixed ${filename} -> ${correctFilename}`)
          fixed++
        } catch (error) {
          console.error(`✗ Error fixing ${filename}:`, error)
          errors++
        }
      } else {
        console.log(`⚠ File not found on disk: ${correctFilePath}`)
      }
    }
  }

  console.log(`\nFixed ${fixed} filenames`)
  console.log(`Errors: ${errors}`)
  process.exit(0)
}

fixDuplicateFilenames().catch((error) => {
  console.error('Fix failed:', error)
  process.exit(1)
})
