#!/usr/bin/env tsx
/**
 * Validate Deployment Script
 *
 * Validates that the production deployment is working correctly:
 * - Database connection
 * - R2 storage access
 * - Environment variables
 *
 * Usage: pnpm run validate:prod
 */

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { Client } from 'pg'

async function validateDeployment() {
  console.log('🔍 Production Deployment Validation')
  console.log('━'.repeat(60))

  let allValid = true

  // 1. Validate environment variables
  console.log('\n1️⃣  Checking environment variables...')
  const requiredVars = [
    'DATABASE_URI',
    'PAYLOAD_SECRET',
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_ACCESS_KEY_ID',
    'CLOUDFLARE_SECRET_ACCESS_KEY',
  ]

  const missing = requiredVars.filter((v) => !process.env[v])
  if (missing.length > 0) {
    console.log('   ❌ Missing variables:', missing.join(', '))
    allValid = false
  } else {
    console.log('   ✅ All required environment variables present')
  }

  // 2. Validate database connection
  console.log('\n2️⃣  Testing database connection...')
  try {
    const client = new Client({ connectionString: process.env.DATABASE_URI })
    await client.connect()
    const result = await client.query('SELECT NOW()')
    await client.end()
    console.log('   ✅ Database connection successful')
    console.log(`   📅 Server time: ${result.rows[0].now}`)
  } catch (error) {
    console.log('   ❌ Database connection failed:', error)
    allValid = false
  }

  // 3. Validate R2 access
  console.log('\n3️⃣  Testing Cloudflare R2 access...')
  try {
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
      },
    })

    const bucketName = process.env.CLOUDFLARE_BUCKET || 'jesirgb-pictures'

    // Test bucket with media prefix
    const mediaResult = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: 'media/',
        MaxKeys: 1,
      }),
    )
    console.log(
      `   ✅ Bucket "${bucketName}" media/ prefix accessible (${mediaResult.KeyCount || 0} files)`,
    )

    // Test bucket with photos prefix
    const photosResult = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: 'photos/',
        MaxKeys: 1,
      }),
    )
    console.log(
      `   ✅ Bucket "${bucketName}" photos/ prefix accessible (${photosResult.KeyCount || 0} files)`,
    )
  } catch (error) {
    console.log('   ❌ R2 access failed:', error)
    allValid = false
  }

  // Summary
  console.log('\n' + '━'.repeat(60))
  if (allValid) {
    console.log('✅ All validation checks passed!')
    console.log('\n💡 Your deployment is ready to go!')
  } else {
    console.log('❌ Some validation checks failed')
    console.log('\n💡 Fix the issues above before deploying')
    process.exit(1)
  }
}

validateDeployment().catch((error) => {
  console.error('\n❌ Validation error:', error)
  process.exit(1)
})
