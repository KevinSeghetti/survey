#!/bin/sh
# run as root
dnf install -y postgresql-server postgresql-contrib postgresqql-devel
dnf install -y libpqxx-devel

systemctl enable postgresql
systemctl start postgresql

postgresql-setup initdb

# old 
## custom build of python
#wget https://www.python.org/ftp/python/3.4.1/Python-3.4.1.tgz --no-check-certificate
#tar -xzvf Python-3.4.1.tgz
#cd Python-3.4.1
#./configure --prefix=$HOME/.python3.4
#make
#make install
#
## create virtualenv
#cd $HOME/.python3.4/bin
#./virtualenv -p $HOME/.python3.4/bin/python3.4 $HOME/venv
#cd $HOME/venv
#source bin/activate
#
#
#source venv/bin/activate.csh
#
#pip install django
#
#pip install psycopg2

#===============================================================================

edit
/var/lib/pgsql/data/pg_hba.conf
set trust for local and 127 lines
