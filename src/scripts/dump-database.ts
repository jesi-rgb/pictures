#!/usr/bin/env tsx
/**
 * Database Dump Script
 *
 * Dumps the current database to a SQL file for migration to production.
 * Uses pg_dump to create a complete backup of schema and data.
 *
 * Usage: pnpm run db:dump
 */

import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import fs from 'node:fs'

const execAsync = promisify(exec)

async function dumpDatabase() {
  const databaseUri = process.env.DATABASE_URI

  if (!databaseUri) {
    console.error('❌ DATABASE_URI environment variable not set')
    console.error('Make sure to run this script with: pnpm run db:dump')
    process.exit(1)
  }

  // Parse database URI to get connection details
  const url = new URL(databaseUri)
  const dbName = url.pathname.slice(1) // Remove leading slash
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const outputFile = path.join(process.cwd(), `backup-${timestamp}.sql`)

  // Get SSL mode from query params or default to prefer
  const sslMode = url.searchParams.get('sslmode') || 'prefer'

  console.log('🗄️  Starting database dump...')
  console.log(`📍 Database: ${dbName}`)
  console.log(`🔒 SSL Mode: ${sslMode}`)
  console.log(`📁 Output: ${outputFile}`)

  try {
    // Set password and SSL mode via environment variables for pg_dump
    const env = {
      ...process.env,
      PGPASSWORD: url.password,
      PGSSLMODE: sslMode,
      PGCONNECT_TIMEOUT: '60', // 60 second timeout for scale-to-zero instances
    }

    // For non-persistent databases (scale-to-zero), wake it up first
    console.log('\n🔥 Warming up database (for scale-to-zero instances)...')
    console.log('   This may take 30-60 seconds...')

    const warmupCommand = `psql -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} -c "SELECT version();" -t`

    let warmupAttempts = 0
    const maxWarmupAttempts = 3

    while (warmupAttempts < maxWarmupAttempts) {
      try {
        warmupAttempts++
        console.log(`   Attempt ${warmupAttempts}/${maxWarmupAttempts}...`)
        await execAsync(warmupCommand, { env, timeout: 60000 })
        console.log('   ✅ Database is ready!')
        break
      } catch (warmupError) {
        if (warmupAttempts >= maxWarmupAttempts) {
          throw warmupError
        }
        console.log(`   ⏳ Waiting 10s before retry...`)
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }
    }

    // Run pg_dump
    const command = `pg_dump -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} --clean --if-exists --no-owner --no-acl -f "${outputFile}"`

    console.log('\n⏳ Dumping database...')
    await execAsync(command, { env, maxBuffer: 100 * 1024 * 1024 }) // 100MB buffer

    // Check if file was created
    const stats = fs.statSync(outputFile)
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)

    console.log('\n✅ Database dump completed successfully!')
    console.log(`📊 File size: ${fileSizeMB} MB`)
    console.log(`📁 Location: ${outputFile}`)
    console.log('\n💡 Next steps:')
    console.log('   1. Review the dump file')
    console.log('   2. Set up your production database in Unikraft Cloud')
    console.log('   3. Update .env.production with production DATABASE_URI')
    console.log('   4. Run: pnpm run db:restore')
  } catch (error) {
    console.error('\n❌ Database dump failed:')
    if (error instanceof Error) {
      console.error(error.message)
    }

    if (error instanceof Error && error.message.includes('SSL')) {
      console.error('\n⚠️  Known Unikraft Cloud PostgreSQL SSL Issue')
      console.error('   External connections to Unikraft PostgreSQL fail due to SSL configuration.')
      console.error('   See UNIKRAFT_SSL_ISSUE.md for details.')
      console.error('\n💡 Solutions:')
      console.error('   1. Use internal hostname (.internal) from within Unikraft Cloud')
      console.error(
        '   2. Deploy a dump instance in Unikraft Cloud that can access internal network',
      )
      console.error('   3. Contact Unikraft Cloud support about SSL connection issues')
      console.error('   4. Service UUID: Check `kraft cloud service list` for your service ID')
    } else {
      console.error('\n💡 Make sure pg_dump is installed:')
      console.error('   macOS: brew install postgresql')
      console.error('   Ubuntu: sudo apt-get install postgresql-client')
    }
    process.exit(1)
  }
}

dumpDatabase().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
