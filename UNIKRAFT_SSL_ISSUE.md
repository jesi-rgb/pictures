# Unikraft Cloud PostgreSQL SSL Connection Issue

## Problem

PostgreSQL connections to `white-sunset-4vzsavuu.fra.unikraft.app:5432` fail with:

```
SSL connection has been closed unexpectedly
```

## Evidence

### 1. TLS Handshake Succeeds

```bash
$ openssl s_client -connect white-sunset-4vzsavuu.fra.unikraft.app:5432 -starttls postgres
# Returns: Verify return code: 0 (ok)
# Certificate: *.fra.unikraft.app (Let's Encrypt)
# TLS 1.3 handshake completes successfully
```

### 2. PostgreSQL Clients Fail

All PostgreSQL clients fail after TLS handshake:

- `psql`: "SSL connection has been closed unexpectedly"
- `pg_dump`: Same error
- Node.js `pg` library: "Connection terminated unexpectedly"

### 3. Traffic Reaches Server

Unikraft Cloud dashboard shows incoming connections (RX packets), confirming the issue is not network/firewall.

## Root Cause

The TLS handshake completes successfully, but PostgreSQL closes the connection immediately after the SSL negotiation, before any PostgreSQL protocol messages are exchanged.

This suggests:

- PostgreSQL SSL configuration issue in Unikraft's PostgreSQL image
- Possible incompatibility with OpenSSL 3.x clients
- Missing or incorrect SSL parameters in `postgresql.conf`

## Attempted Solutions

❌ `sslmode=require` - Fails  
❌ `sslmode=prefer` - Fails  
❌ `sslmode=allow` - Fails  
❌ SSL with `rejectUnauthorized: false` - Fails  
❌ Increased timeouts (60s+) - Fails  
❌ Warmup connections - Fails  
❌ Different PostgreSQL client versions - Fails

## Impact

- Cannot dump database using `pg_dump`
- Cannot restore database using `psql`
- Blocks migration workflows
- Forces use of internal-only database access

## Workaround

Use the `.internal` hostname from within Unikraft Cloud network:

```
postgresql://postgres:PASSWORD@white-sunset-4vzsavuu.internal:5432/postgres
```

## Recommendation

Contact Unikraft Cloud support with:

1. This error report
2. Service UUID: `d01eda4b-5971-4483-861f-1872fd3c98d8`
3. Request investigation of PostgreSQL SSL configuration
4. Ask for alternative backup/export methods

## System Info

- PostgreSQL Client: 16.11 (Homebrew)
- OpenSSL: 3.6.0
- OS: macOS
- Server: Unikraft Cloud PostgreSQL (Frankfurt)
