#!/bin/bash
# script to back up DB
set -e

if ! hash python3  2>/dev/null ; then
echo "python3 not found"
exit 1
fi

if [[ $EUID -eq 0 ]]; then
  echo "This script must NOT be run as root" 1>&2
  exit 1
fi

#-------------------------------------------------------------------------------

DATE=`date '+%Y%m%d'`
./manage.py dumpdata --indent=2 > checklist_db_backup_$DATE.fixture.json

