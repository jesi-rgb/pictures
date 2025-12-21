import { getPayload } from 'payload'
import config from '../payload.config.js'

async function migratePhotosToR2() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Get all photos from database
  const allPhotos = await payload.find({
    collection: 'photos',
    limit: 1000,
  })

  console.log(`Found ${allPhotos.docs.length} photos in database`)

  let updated = 0
  let errors = 0

  for (const photo of allPhotos.docs) {
    const filename = (photo as { filename?: string }).filename

    if (!filename) {
      console.log(`⚠ Skipping photo ${photo.id} - no filename`)
      continue
    }

    try {
      // Update the photo record to indicate it's stored in R2
      // The S3 storage plugin will automatically handle the URL generation
      await payload.update({
        collection: 'photos',
        id: photo.id,
        data: {
          // Update the prefix to 'photos' to match R2 structure
          prefix: 'photos',
        } as never,
      })

      console.log(`✓ Migrated ${filename} to R2`)
      updated++
    } catch (error) {
      console.error(`✗ Error migrating ${filename}:`, error)
      errors++
    }
  }

  console.log(`\nMigrated ${updated} photos to R2`)
  console.log(`Errors: ${errors}`)
  process.exit(0)
}

migratePhotosToR2().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
