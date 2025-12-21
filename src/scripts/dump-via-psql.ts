#!/usr/bin/env tsx
/**
 * Database Dump via PSQL
 *
 * Uses psql to generate a dump instead of pg_dump
 * This workaround may help with SSL connection issues
 */

import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'

const execAsync = promisify(exec)

async function dumpViaPsql() {
  const databaseUri = process.env.DATABASE_URI

  if (!databaseUri) {
    console.error('❌ DATABASE_URI environment variable not set')
    process.exit(1)
  }

  const url = new URL(databaseUri)
  const dbName = url.pathname.slice(1)
  const sslMode = url.searchParams.get('sslmode') || 'prefer'
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const outputFile = path.join(process.cwd(), `backup-psql-${timestamp}.sql`)

  console.log('🗄️  Dumping via psql...')
  console.log(`📍 Database: ${dbName}`)
  console.log(`🔒 SSL Mode: ${sslMode}`)
  console.log(`📁 Output: ${outputFile}`)

  try {
    const env = {
      ...process.env,
      PGPASSWORD: url.password,
      PGSSLMODE: sslMode,
      PGCONNECT_TIMEOUT: '30',
    }

    // Use psql to generate SQL dump via pg_dump invocation
    // This sometimes works better with SSL
    const command = `psql -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} -c "\\! pg_dump -h ${url.hostname} -p ${url.port || 5432} -U ${url.username} -d ${dbName} --clean --if-exists --no-owner --no-acl" > "${outputFile}"`

    console.log('\n⏳ Attempting dump...')
    await execAsync(command, { env, maxBuffer: 100 * 1024 * 1024 })

    console.log('\n✅ Dump completed!')
    console.log(`📁 Location: ${outputFile}`)
  } catch (error) {
    console.error('\n❌ Dump failed:')
    if (error instanceof Error) {
      console.error(error.message)
    }
    console.error('\n💡 This appears to be a Unikraft Cloud PostgreSQL SSL issue.')
    console.error('   Recommendations:')
    console.error('   1. Contact Unikraft Cloud support about SSL connection issues')
    console.error('   2. Ask them to check PostgreSQL SSL configuration')
    console.error('   3. Request alternative backup/export methods')
    process.exit(1)
  }
}

dumpViaPsql().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
