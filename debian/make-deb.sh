#!/bin/bash

HOMEDIR=`pwd`/..
export PYTHONPATH=`pwd`/../localpythonlibraries/lib64/python3.5/site-packages/:`pwd`/../localpythonlibraries/lib/python3.5/site-packages/
export RAILS_ENV=production
cd ..
pwd
mkdir `pwd`/localpythonlibraries/
./pipsetup.py `pwd`/localpythonlibraries/
cd ${HOMEDIR}/survey/survey && npm install
pwd
export
echo PYTHONPATH=${PYTHONPATH}
cd ${HOMEDIR}/survey && ( ./node_modules/.bin/webpack -p; ./manage.py migrate -v 0; ./manage.py collectstatic --noinput -i jsx -i '*.scss' -v 0; ./manage.py collectstatic --clear --noinput -i jsx -i '*.scss' -v 0; ./manage.py compilestatic )
export VERSION=1.0-1
export APP_DIR=app_${VERSION}
sudo rm -rf package ; mkdir package && cd package
pwd
mkdir -p ${APP_DIR}/DEBIAN
cp ../debian/control ${APP_DIR}/DEBIAN/control
export DEB_APP_DIR=${APP_DIR}/opt/app/
mkdir -p ${DEB_APP_DIR}
rsync -avz --exclude 'app/assets/' ../app ${DEB_APP_DIR}
cp -R ../localpythonlibraries/ ${DEB_APP_DIR}
cp -R ../public/ ${DEB_APP_DIR}
cp -R ../survey/ ${DEB_APP_DIR}
-sudo adduser --disabled-password deployer
sudo chown -R deployer:staff ${APP_DIR}
dpkg-deb -v --build app_${VERSION}
