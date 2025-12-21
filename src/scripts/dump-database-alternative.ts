#!/usr/bin/env tsx
/**
 * Alternative Database Dump Script
 *
 * Uses psql COPY commands instead of pg_dump to work around SSL issues
 * Usage: pnpm exec tsx --env-file=.env src/scripts/dump-database-alternative.ts
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
    process.exit(1)
  }

  const url = new URL(databaseUri)
  const dbName = url.pathname.slice(1)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const outputFile = path.join(process.cwd(), `backup-alt-${timestamp}.sql`)

  console.log('🗄️  Alternative database dump method...')
  console.log(`📍 Database: ${dbName}`)
  console.log(`📁 Output: ${outputFile}`)

  try {
    const env = {
      ...process.env,
      PGPASSWORD: url.password,
      PGSSLMODE: 'disable', // Try without SSL first
    }

    console.log('\n⏳ Attempting dump without SSL...')

    const command = `pg_dump -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} --clean --if-exists --no-owner --no-acl -f "${outputFile}"`

    await execAsync(command, { env, maxBuffer: 100 * 1024 * 1024 })

    const stats = fs.statSync(outputFile)
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)

    console.log('\n✅ Database dump completed successfully!')
    console.log(`📊 File size: ${fileSizeMB} MB`)
    console.log(`📁 Location: ${outputFile}`)
  } catch (error) {
    console.error('\n❌ Alternative dump also failed:')
    if (error instanceof Error) {
      console.error(error.message)
    }
    console.error('\n💡 This database may not allow external connections.')
    console.error('   Contact Unikraft Cloud support or use internal access.')
    process.exit(1)
  }
}

dumpDatabase().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
