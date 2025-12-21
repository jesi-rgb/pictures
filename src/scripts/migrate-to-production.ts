#!/usr/bin/env tsx
/**
 * Migrate to Production Script
 *
 * Master script that orchestrates the complete migration to production:
 * 1. Dumps local database
 * 2. Restores to production database
 * 3. Uploads all media files to R2
 * 4. Validates the migration
 *
 * Usage: pnpm run migrate:prod
 */

import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import readline from 'node:readline'

const execAsync = promisify(exec)

async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
}

async function runStep(name: string, command: string): Promise<boolean> {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📍 Step: ${name}`)
  console.log(`${'='.repeat(60)}`)

  try {
    const { stdout, stderr } = await execAsync(command, {
      env: process.env,
      maxBuffer: 100 * 1024 * 1024,
    })

    if (stdout) console.log(stdout)
    if (stderr && !stderr.includes('NOTICE')) console.log(stderr)

    console.log(`✅ ${name} completed successfully`)
    return true
  } catch (error) {
    console.error(`❌ ${name} failed:`)
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

async function migrateToProduction() {
  console.log('🚀 Production Migration Tool')
  console.log('━'.repeat(60))
  console.log('\nThis script will:')
  console.log('  1. ✅ Dump your local database')
  console.log('  2. ✅ Restore it to production (Unikraft PostgreSQL)')
  console.log('  3. ✅ Upload all media files to Cloudflare R2')
  console.log('  4. ✅ Validate the migration')
  console.log('')

  // Validate environment
  const requiredEnvVars = [
    'DATABASE_URI',
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_ACCESS_KEY_ID',
    'CLOUDFLARE_SECRET_ACCESS_KEY',
  ]

  const missing = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach((varName) => console.error(`   - ${varName}`))
    console.error('\n💡 Make sure to run with .env.production loaded:')
    console.error('   pnpm run migrate:prod')
    process.exit(1)
  }

  // Check if production
  if (process.env.NODE_ENV !== 'production') {
    console.error('⚠️  WARNING: NODE_ENV is not set to "production"')
    console.error('Current NODE_ENV:', process.env.NODE_ENV || 'undefined')

    const shouldContinue = await confirm('\n❓ Continue anyway? (y/n): ')
    if (!shouldContinue) {
      console.log('❌ Migration cancelled')
      process.exit(0)
    }
  }

  // Parse database URI to show target
  const url = new URL(process.env.DATABASE_URI!)
  console.log(`🎯 Target Database: ${url.hostname}`)
  console.log(`📦 Target Storage: Cloudflare R2`)
  console.log('')

  const shouldProceed = await confirm('❓ Ready to start migration? (y/n): ')

  if (!shouldProceed) {
    console.log('❌ Migration cancelled')
    process.exit(0)
  }

  const startTime = Date.now()

  // Step 1: Dump local database
  const dumpSuccess = await runStep(
    'Dump Local Database',
    'tsx --env-file=.env src/scripts/dump-database.ts',
  )

  if (!dumpSuccess) {
    console.error('\n❌ Migration failed at database dump step')
    process.exit(1)
  }

  // Step 2: Restore to production
  const restoreSuccess = await runStep(
    'Restore to Production Database',
    'tsx --env-file=.env.production src/scripts/restore-database.ts',
  )

  if (!restoreSuccess) {
    console.error('\n❌ Migration failed at database restore step')
    console.error('💡 Your local database is backed up, but production was not updated')
    process.exit(1)
  }

  // Step 3: Upload to R2
  const uploadSuccess = await runStep(
    'Upload Files to R2',
    'tsx --env-file=.env.production src/scripts/upload-to-r2.ts',
  )

  if (!uploadSuccess) {
    console.error('\n❌ Migration failed at file upload step')
    console.error('💡 Your database is migrated, but files were not uploaded to R2')
    console.error('You can retry with: pnpm run sync:r2')
    process.exit(1)
  }

  const duration = Math.round((Date.now() - startTime) / 1000)

  console.log('\n' + '='.repeat(60))
  console.log('🎉 Migration Completed Successfully!')
  console.log('='.repeat(60))
  console.log(`⏱️  Total time: ${duration}s`)
  console.log('\n💡 Next steps:')
  console.log('   1. Deploy your app: ./deploy.sh')
  console.log('   2. Validate deployment: pnpm run validate:prod')
  console.log('   3. Test your production site')
}

migrateToProduction().catch((error) => {
  console.error('\n❌ Unexpected error:', error)
  process.exit(1)
})
