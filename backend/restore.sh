#!/bin/bash
set -e
DB_BACKUP=$1
FILES_BACKUP=$2
cp $DB_BACKUP backend/database/database.sqlite
tar xzf $FILES_BACKUP -C backend/
echo "Restore complete." 