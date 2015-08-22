#!/bin/sh

sudo dnf install postgresql-server postgresql-contrib postgresqql-devel
sudo systemctl enable postgresql
sudo systemctl start postgresql

sudo postgresql-setup initdb


# http://www.mixtmeta.com/blog/python-on-dreamhost-part-1

# custom build of python
wget https://www.python.org/ftp/python/3.4.1/Python-3.4.1.tgz --no-check-certificate
tar -xzvf Python-3.4.1.tgz
cd Python-3.4.1
./configure --prefix=$HOME/.python3.4
make
make install

# create virtualenv
cd $HOME/.python3.4/bin
./virtualenv -p $HOME/.python3.4/bin/python3.4 $HOME/venv
cd $HOME/venv
source bin/activate

#===============================================================================

psql -c 'create database bdsm_checklist;'

CREATE USER bdsm_checklist WITH PASSWORD 'oj9387gy2hb0s';
GRANT ALL PRIVILEGES ON DATABASE bdsm_checklist to bdsm_checklist;

