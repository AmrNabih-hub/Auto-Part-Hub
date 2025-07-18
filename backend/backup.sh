#!/bin/bash
set -e
DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="backend/database/database.sqlite"
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR
cp $DB_PATH $BACKUP_DIR/database_$DATE.sqlite
tar czf $BACKUP_DIR/files_$DATE.tar.gz backend/storage
echo "Backup complete: $BACKUP_DIR" 