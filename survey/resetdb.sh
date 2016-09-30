#!/bin/bash
# run as user that has permissions to do these operations

dropdb survey
createuser survey

psql -c 'create database survey  ;'
psql <<EOT
CREATE USER survey WITH PASSWORD 'oj9387gy2hb0s';
GRANT ALL PRIVILEGES ON DATABASE survey to survey;
\q
exit
EOT

#===============================================================================


