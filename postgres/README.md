# PostgreSQL on Unikraft Cloud

This directory contains scripts and configuration for deploying PostgreSQL on Unikraft Cloud with persistent volume storage.

## Overview

- **PostgreSQL Version**: 16.4
- **Base Image**: Alpine 3.20
- **Runtime**: Unikraft base-compat:latest
- **Volume**: `photos-volume` (200MB)
- **Scale-to-zero**: Enabled with idle policy
- **Plugin**: pg_ukc_scaletozero for query-aware scale-to-zero

## Quick Start

### 1. Set Up Environment

```bash
# Set your Unikraft Cloud token
export UKC_TOKEN=your-token-here

# Set metro (default: fra - Frankfurt, Germany)
export UKC_METRO=fra
```

### 2. Create Volume

```bash
cd postgres
./create-volume.sh
```

This creates a persistent volume named `photos-volume` (200MB) for PostgreSQL data.

### 3. Deploy PostgreSQL

```bash
./deploy-postgres.sh [password]
```

Optional: Provide a custom password (default: `unikraft`)

Example:

```bash
./deploy-postgres.sh my-secure-password
```

### 4. Manage Instance

```bash
# Check status
./manage-postgres.sh status

# View logs
./manage-postgres.sh logs

# Get connection info
./manage-postgres.sh connect

# Stop/start/restart
./manage-postgres.sh stop
./manage-postgres.sh start
./manage-postgres.sh restart
```

## Manual Deployment

If you prefer to deploy manually without the scripts:

```bash
# Create volume
kraft cloud volume create --name photos-volume --size 200

# Deploy PostgreSQL
kraft cloud deploy \
  -e POSTGRES_PASSWORD=unikraft \
  -e PGDATA=/volume/postgres \
  -v photos-volume:/volume \
  -p 5432:5432/tls \
  -M 1024 \
  .
```

## Connecting to PostgreSQL

The output shows the instance address and other details:

```ansi
[●] Deployed successfully!
 │
 ├────────── name: postgres-saan9
 ├────────── uuid: 3a1371f2-68c6-4187-84f8-c080f2b028ca
 ├───────── state: starting
 ├────────── fqdn: young-thunder-fbafrsxj.fra.unikraft.app
 ├───────── image: postgres@sha256:2476c0373d663d7604def7c35ffcb4ed4de8ab231309b4f20104b84f31570766
 ├──────── memory: 1024 MiB
 ├─────── service: young-thunder-fbafrsxj
 ├── private fqdn: postgres-saan9.internal
 ├──── private ip: 172.16.3.1
 └────────── args: wrapper.sh docker-entrypoint.sh postgres -c shared_preload_libraries='pg_ukc_scaletozero'
```

In this case, the instance name is `postgres-saan9` and the service `young-thunder-fbafrsxj`.
They're different for each run.

If you use port 5432/tls per the example above, you can now directly connect to postgres:

```console
psql -U postgres -h young-thunder-fbafrsxj.fra.unikraft.app
```

Use the `unikraft` password at the password prompt.
You should see output like:

```ansi
Password for user postgres:
psql (15.5 (Ubuntu 15.5-0ubuntu0.23.04.1), server 16.2)
WARNING: psql major version 15, server major version 16.
         Some psql features might not work.
Type "help" for help.

postgres=#
```

Use SQL and `psql` commands for your work.

### From Another Unikraft Instance

Use the internal FQDN (e.g., `postgres-saan9.internal`) for connections from other instances in Unikraft Cloud:

```bash
psql -U postgres -h postgres-saan9.internal
```

Or in your connection string:

```
postgresql://postgres:password@postgres-saan9.internal:5432/postgres
```

## Scale-to-Zero

> **Tip:**
> This example uses the [`idle` scale-to-zero policy](https://unikraft.com/docs/api/platform/v1/instances#scaletozero_policy) by default (see the `labels` section in the `Kraftfile`).
> It means that the instance will scale-to-zero even in the presence of `psql` connections.
> To ensure that the instance isn't put into standby even for long running queries
> (during which the connections are also idle).
> The PostgreSQL example makes use of scale-to-zero app support.
> To this end, the example loads the [`pg_ukc_scaletozero`](https://github.com/unikraft-cloud/pg_ukc_scaletozero) module into PostgreSQL, which suspends scale-to-zero during query processing.
> You can see this in action by running `SELECT pg_sleep(10);` and verifying that the instance keeps on running.

> **Note:**
> If you'd like to use a port other than `5432/tls` you'll need to use the `kraft cloud tunnel` command to connect to PostgreSQL.
> See [the tunneling guide](https://unikraft.com/docs/cli/tunnel) for more information.
> Additionally, you need to explicitly disable scale-to-zero by either changing the label in the `Kraftfile` or use `--scale-to-zero off` in the deploy command.

## Instance Management

### Check Status

```bash
kraft cloud instance list
```

```ansi
NAME            FQDN                                     STATE    STATUS         IMAGE                                   MEMORY   VCPUS  ARGS                                      BOOT TIME
postgres-saan9  young-thunder-fbafrsxj.fra.unikraft.app  running  6 minutes ago  postgres@sha256:2476c0373d663d7604d...  1.0 GiB  1      wrapper.sh docker-entrypoint.sh postgres  603.42 ms
```

### View Logs

```bash
kraft cloud instance logs postgres-saan9 --follow
```

### Remove Instance

When done, you can remove the instance:

```bash
kraft cloud instance remove postgres-saan9
```

**Note**: The volume `photos-volume` will be preserved. To delete it:

```bash
kraft cloud volume delete photos-volume
```

## Using Volumes

This deployment uses [volumes](https://unikraft.com/docs/platform/volumes) for data persistence.

### Volume Configuration

- **Name**: `photos-volume`
- **Size**: 200MB
- **Mount Point**: `/volume`
- **PostgreSQL Data**: `/volume/postgres` (set via `PGDATA` env var)

### Create Volume Manually

```bash
kraft cloud volume create --name photos-volume --size 200
```

### Deploy with Volume

```bash
kraft cloud deploy \
  -e POSTGRES_PASSWORD=unikraft \
  -e PGDATA=/volume/postgres \
  -v photos-volume:/volume \
  -p 5432:5432/tls \
  -M 1024 \
  .
```

### Check Volume Status

```bash
kraft cloud volume list
kraft cloud volume get photos-volume
```

## Customization

### Environment Variables

You can customize the deployment with these environment variables:

- `POSTGRES_PASSWORD`: Database superuser password (required)
- `PGDATA`: Path to database files (default: `/var/lib/postgresql/data`)
- `POSTGRES_USER`: Database superuser username (default: `postgres`)
- `POSTGRES_DB`: Default database name (default: same as `POSTGRES_USER`)
- `POSTGRES_INITDB_ARGS`: Additional arguments for `initdb`
- `POSTGRES_HOST_AUTH_METHOD`: Authentication method (default: password-based)

### Resource Configuration

Edit `deploy-postgres.sh` to change:

- **Memory**: Default 1024MB
- **Volume Size**: Default 200MB (in `create-volume.sh`)
- **Metro**: Set via `UKC_METRO` env var

### Disable Scale-to-Zero

Edit `Kraftfile` and remove the scale-to-zero labels:

```yaml
# Remove or comment out these lines:
labels:
  cloud.unikraft.v1.instances/scale_to_zero.policy: 'idle'
  cloud.unikraft.v1.instances/scale_to_zero.stateful: 'true'
  cloud.unikraft.v1.instances/scale_to_zero.cooldown_time_ms: 1000
```

## Integration with Your App

To use this PostgreSQL instance in your main application:

1. Deploy PostgreSQL with the scripts above
2. Get the internal FQDN: `./manage-postgres.sh connect`
3. Use in your app's connection string:
   ```
   postgresql://postgres:password@postgres-xxxxx.internal:5432/postgres
   ```

For the paytest application, update `.env.production`:

```bash
DATABASE_URI=postgresql://postgres:your-password@postgres-xxxxx.internal:5432/postgres
```

## File Structure

```
postgres/
├── fs/                          # Filesystem overlay
│   ├── etc/passwd              # User configuration
│   └── usr/local/share/postgresql/
│       ├── pg_hba.conf.sample  # Auth configuration
│       └── postgresql.conf.sample
├── Dockerfile                   # Multi-stage build for PostgreSQL
├── Kraftfile                    # Unikraft configuration
├── wrapper.sh                   # PostgreSQL entrypoint wrapper
├── allow-root.patch            # Allow PostgreSQL to run as root
├── create-volume.sh            # Create persistent volume
├── deploy-postgres.sh          # Deploy to Unikraft Cloud
├── manage-postgres.sh          # Manage running instance
└── README.md                   # This file
```

## Troubleshooting

### Instance Won't Start

```bash
# Check logs
./manage-postgres.sh logs

# Check instance details
./manage-postgres.sh info
```

Common issues:

- Volume not found → Run `./create-volume.sh`
- Token not set → Export `UKC_TOKEN`
- Out of memory → Increase memory in `deploy-postgres.sh`

### Can't Connect

```bash
# Verify instance is running
./manage-postgres.sh status

# Get connection details
./manage-postgres.sh connect

# Test connection
psql -U postgres -h your-fqdn.fra.unikraft.app -c "SELECT NOW();"
```

### Data Not Persisting

Check that volume is mounted:

```bash
kraft cloud instance get your-instance | grep volume
```

Verify `PGDATA` points to volume:

```bash
kraft cloud instance get your-instance | grep PGDATA
```

## Resources

- **Unikraft Cloud Docs**: https://unikraft.org/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/16/
- **Scale-to-Zero Plugin**: https://github.com/unikraft-cloud/pg_ukc_scaletozero
- **CLI Reference**: https://unikraft.com/docs/cli/overview
