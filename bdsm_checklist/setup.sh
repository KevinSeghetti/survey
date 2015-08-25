#!/bin/bash

# first run fedora-setup.sh 

# setup for development

SOURCE_PATH=~
$DEST_PATH=~/ktsprojects

# http://www.mixtmeta.com/blog/python-on-dreamhost-part-1

su -c 'su - postgres' <<EOT 
psql -c 'create database bdsm_checklist;'
psql 
CREATE USER bdsm_checklist WITH PASSWORD 'oj9387gy2hb0s';
GRANT ALL PRIVILEGES ON DATABASE bdsm_checklist to bdsm_checklist;
\q
exit
EOT



mkdir $SOURCE_PATH/python
cd $SOURCE_PATH/python
wget http://python.org/ftp/python/3.4.3/Python-3.4.3.tar.xz
tar xvfJ Python-3.4.3.tar.xz 
cd Python-3.4.3
./configure --prefix=$DEST_PATH/Python34
make
make install

echo 'export PATH=$DEST_PATH/Python34/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile              
         
git clone tenettio@tenetti.org:~/kts.git $DEST_PATH 

cd $DEST_PATH      
pyvenv-3.4 venv
source venv/bin/activate.csh

pip install django
pip install psycopg2

cd $DEST_PATH/bdsm_checklist

echo "from django.contrib.auth.models import User; User.objects.create_superuser('kts', 'kts@tenetti.org', 'jdo08589fj2')" | ./manage.py shell
python manage.py migrate
python manage.py loaddata question.fixture.json
python manage.py runserver


