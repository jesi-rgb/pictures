#!/usr/bin/env tsx
/**
 * Upload to R2 Script
 *
 * Uploads all local media files to Cloudflare R2 storage.
 * This script syncs files from local /media and /photos directories to R2.
 *
 * Usage: pnpm run sync:r2
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import fs from 'node:fs'
import path from 'node:path'
import { readdir } from 'node:fs/promises'

interface UploadStats {
  total: number
  uploaded: number
  skipped: number
  failed: number
}

async function getAllFiles(dir: string): Promise<string[]> {
  const files: string[] = []

  const items = await readdir(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

async function uploadToR2() {
  // Validate environment variables
  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_SECRET_ACCESS_KEY } =
    process.env

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_SECRET_ACCESS_KEY) {
    console.error('❌ Missing required environment variables')
    console.error(
      'Required: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_SECRET_ACCESS_KEY',
    )
    console.error('\n💡 Make sure to run with: pnpm run sync:r2')
    process.exit(1)
  }

  // Initialize S3 client for R2
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  })

  const stats: UploadStats = {
    total: 0,
    uploaded: 0,
    skipped: 0,
    failed: 0,
  }

  const bucketName = process.env.CLOUDFLARE_BUCKET || 'jesirgb-pictures'

  console.log('☁️  Cloudflare R2 Upload')
  console.log('━'.repeat(50))
  console.log(`📦 Target Bucket: ${bucketName}`)

  // Upload media collection with prefix
  await uploadCollection(s3Client, 'media', bucketName, 'media/', stats)

  // Upload photos collection with prefix
  await uploadCollection(s3Client, 'photos', bucketName, 'photos/', stats)

  // Print summary
  console.log('\n📊 Upload Summary')
  console.log('━'.repeat(50))
  console.log(`✅ Total files: ${stats.total}`)
  console.log(`⬆️  Uploaded: ${stats.uploaded}`)
  console.log(`⏭️  Skipped (already exists): ${stats.skipped}`)
  if (stats.failed > 0) {
    console.log(`❌ Failed: ${stats.failed}`)
  }

  console.log('\n💡 Next steps:')
  console.log('   1. Verify files in Cloudflare R2 dashboard')
  console.log('   2. Deploy your application: ./deploy.sh')
  console.log('   3. Validate deployment: pnpm run validate:prod')
}

async function uploadCollection(
  s3Client: S3Client,
  collectionName: string,
  bucketName: string,
  prefix: string,
  stats: UploadStats,
) {
  const localDir = path.join(process.cwd(), collectionName)

  if (!fs.existsSync(localDir)) {
    console.log(`\n⚠️  Directory not found: ${localDir}`)
    console.log(`   Skipping ${collectionName} collection`)
    return
  }

  console.log(`\n📁 Uploading ${collectionName} → ${bucketName}/${prefix}`)

  const files = await getAllFiles(localDir)

  for (const filePath of files) {
    const relativePath = path.relative(localDir, filePath)
    // Add prefix to the key (e.g., photos/IMG_2971.JPG)
    const key = `${prefix}${relativePath.replace(/\\/g, '/')}`

    stats.total++

    try {
      // Check if file already exists in R2
      try {
        await s3Client.send(
          new HeadObjectCommand({
            Bucket: bucketName,
            Key: key,
          }),
        )

        // File exists, skip
        console.log(`   ⏭️  ${key} (already exists)`)
        stats.skipped++
        continue
      } catch (_error) {
        // File doesn't exist, proceed with upload
      }

      // Read file
      const fileContent = fs.readFileSync(filePath)

      // Determine content type
      const ext = path.extname(filePath).toLowerCase()
      const contentType = getContentType(ext)

      // Upload to R2
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fileContent,
          ContentType: contentType,
        }),
      )

      console.log(`   ✅ ${key}`)
      stats.uploaded++
    } catch (error) {
      console.error(`   ❌ Failed to upload ${key}:`, error)
      stats.failed++
    }
  }
}

function getContentType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
  }

  return mimeTypes[ext] || 'application/octet-stream'
}

uploadToR2().catch((error) => {
  console.error('\n❌ Upload failed:', error)
  process.exit(1)
})
