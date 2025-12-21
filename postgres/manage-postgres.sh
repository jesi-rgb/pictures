#!/bin/bash
set -e

# Manage PostgreSQL instance on Unikraft Cloud
# Usage: ./manage-postgres.sh [command]
#   Commands: status, logs, connect, stop, start, restart, info, delete

COMMAND="${1:-status}"
POSTGRES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get PostgreSQL instance name
get_instance_name() {
  kraft cloud instance list | grep postgres | awk '{print $1}' | head -1
}

# Display usage
usage() {
  echo "Usage: $0 [command]"
  echo ""
  echo "Commands:"
  echo "  status     - Show instance status (default)"
  echo "  logs       - View instance logs (tail -f)"
  echo "  connect    - Show connection information"
  echo "  stop       - Stop the instance"
  echo "  start      - Start the instance"
  echo "  restart    - Restart the instance"
  echo "  info       - Show detailed instance info"
  echo "  delete     - Delete the instance"
  echo ""
  echo "Examples:"
  echo "  $0 status"
  echo "  $0 logs"
  echo "  $0 connect"
}

# Check if kraft CLI is available
if ! command -v kraft &> /dev/null; then
  echo "❌ kraft CLI not found"
  echo "💡 Install from: https://unikraft.org/docs/cli"
  exit 1
fi

# Check if UKC_TOKEN is set
if [ -z "$UKC_TOKEN" ]; then
  echo "❌ UKC_TOKEN not set"
  echo "💡 Set your Unikraft Cloud token:"
  echo "   export UKC_TOKEN=your-token"
  exit 1
fi

# Get instance name
INSTANCE_NAME=$(get_instance_name)

if [ -z "$INSTANCE_NAME" ]; then
  echo "❌ No PostgreSQL instance found"
  echo ""
  echo "💡 Deploy PostgreSQL first:"
  echo "   cd $POSTGRES_DIR"
  echo "   ./deploy-postgres.sh"
  exit 1
fi

# Execute command
case "$COMMAND" in
  status)
    echo "📊 PostgreSQL Instance Status"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    kraft cloud instance list | grep -E "NAME|$INSTANCE_NAME"
    ;;
    
  logs)
    echo "📜 PostgreSQL Logs (Ctrl+C to exit)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    kraft cloud instance logs "$INSTANCE_NAME" --follow
    ;;
    
  connect)
    echo "🔌 PostgreSQL Connection Information"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    FQDN=$(kraft cloud instance get "$INSTANCE_NAME" | grep "fqdn:" | awk '{print $2}')
    PRIVATE_FQDN=$(kraft cloud instance get "$INSTANCE_NAME" | grep "private fqdn:" | awk '{print $3}')
    
    echo ""
    echo "📝 External connection (from your machine):"
    echo "   psql -U postgres -h $FQDN"
    echo ""
    echo "📝 Connection string (external):"
    echo "   postgresql://postgres:PASSWORD@$FQDN:5432/postgres"
    echo ""
    echo "📝 Internal connection (from Unikraft Cloud):"
    echo "   psql -U postgres -h $PRIVATE_FQDN"
    echo ""
    echo "📝 Connection string (internal):"
    echo "   postgresql://postgres:PASSWORD@$PRIVATE_FQDN:5432/postgres"
    echo ""
    ;;
    
  stop)
    echo "⏸️  Stopping PostgreSQL instance..."
    kraft cloud instance stop "$INSTANCE_NAME"
    echo "✅ Instance stopped"
    ;;
    
  start)
    echo "▶️  Starting PostgreSQL instance..."
    kraft cloud instance start "$INSTANCE_NAME"
    echo "✅ Instance started"
    ;;
    
  restart)
    echo "🔄 Restarting PostgreSQL instance..."
    kraft cloud instance stop "$INSTANCE_NAME"
    sleep 2
    kraft cloud instance start "$INSTANCE_NAME"
    echo "✅ Instance restarted"
    ;;
    
  info)
    echo "ℹ️  PostgreSQL Instance Information"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    kraft cloud instance get "$INSTANCE_NAME"
    ;;
    
  delete)
    echo "⚠️  WARNING: This will delete the PostgreSQL instance"
    echo "   Instance: $INSTANCE_NAME"
    echo ""
    read -p "Are you sure? (yes/no): " -r
    echo ""
    if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
      echo "🗑️  Deleting instance..."
      kraft cloud instance delete "$INSTANCE_NAME"
      echo "✅ Instance deleted"
      echo ""
      echo "💡 Note: Volume 'photos-volume' is still preserved"
      echo "   To delete volume: kraft cloud volume delete photos-volume"
    else
      echo "❌ Cancelled"
    fi
    ;;
    
  help|-h|--help)
    usage
    ;;
    
  *)
    echo "❌ Unknown command: $COMMAND"
    echo ""
    usage
    exit 1
    ;;
esac
