#!/bin/bash
# run as user that has permissions to do these operations

dropdb bdsm_checklist
createuser bdsm_checklist

psql -c 'create database bdsm_checklist  ;'
psql <<EOT
CREATE USER bdsm_checklist WITH PASSWORD 'oj9387gy2hb0s';
GRANT ALL PRIVILEGES ON DATABASE bdsm_checklist to bdsm_checklist;
\q
exit
EOT

#===============================================================================


