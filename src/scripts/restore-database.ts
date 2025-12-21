#!/usr/bin/env tsx
/**
 * Database Restore Script
 *
 * Restores a database dump to the production database.
 * This script should be run with .env.production loaded.
 *
 * Usage: pnpm run db:restore [path-to-sql-file]
 */

import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import fs from 'node:fs'
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

async function restoreDatabase() {
  const databaseUri = process.env.DATABASE_URI

  if (!databaseUri) {
    console.error('❌ DATABASE_URI environment variable not set')
    console.error('Make sure to run this script with: pnpm run db:restore')
    process.exit(1)
  }

  // Get SQL file from command line or look for latest backup
  let sqlFile = process.argv[2]

  if (!sqlFile) {
    // Find the most recent backup file
    const backupFiles = fs
      .readdirSync(process.cwd())
      .filter((f) => f.startsWith('backup-') && f.endsWith('.sql'))
      .sort()
      .reverse()

    if (backupFiles.length === 0) {
      console.error('❌ No backup files found')
      console.error('💡 Run: pnpm run db:dump first, or specify a SQL file')
      process.exit(1)
    }

    sqlFile = backupFiles[0]
    console.log(`📁 Using latest backup: ${sqlFile}`)
  }

  const sqlFilePath = path.resolve(process.cwd(), sqlFile)

  if (!fs.existsSync(sqlFilePath)) {
    console.error(`❌ File not found: ${sqlFilePath}`)
    process.exit(1)
  }

  // Parse database URI
  const url = new URL(databaseUri)
  const dbName = url.pathname.slice(1)

  // Get SSL mode from query params or default to prefer
  const sslMode = url.searchParams.get('sslmode') || 'prefer'

  console.log('🗄️  Database Restore')
  console.log(`📍 Target Database: ${dbName} (${url.hostname})`)
  console.log(`🔒 SSL Mode: ${sslMode}`)
  console.log(`📁 Source File: ${sqlFile}`)
  console.log('')
  console.log('⚠️  WARNING: This will OVERWRITE the target database!')

  const shouldProceed = await confirm('\n❓ Do you want to continue? (y/n): ')

  if (!shouldProceed) {
    console.log('❌ Restore cancelled')
    process.exit(0)
  }

  try {
    const env = {
      ...process.env,
      PGPASSWORD: url.password,
      PGSSLMODE: sslMode,
    }

    const command = `psql -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} -f "${sqlFilePath}"`

    console.log('\n⏳ Restoring database...')
    console.log('This may take a few minutes...')

    const { stderr } = await execAsync(command, {
      env,
      maxBuffer: 100 * 1024 * 1024,
    })

    if (stderr && !stderr.includes('NOTICE')) {
      console.log('\n⚠️  Warnings:', stderr)
    }

    console.log('\n✅ Database restored successfully!')
    console.log('\n💡 Next steps:')
    console.log('   1. Upload images to R2: pnpm run sync:r2')
    console.log('   2. Or run full migration: pnpm run migrate:prod')
  } catch (error) {
    console.error('\n❌ Database restore failed:')
    if (error instanceof Error) {
      console.error(error.message)
    }
    console.error('\n💡 Make sure psql is installed:')
    console.error('   macOS: brew install postgresql')
    console.error('   Ubuntu: sudo apt-get install postgresql-client')
    process.exit(1)
  }
}

restoreDatabase().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
