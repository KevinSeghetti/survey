#!/bin/bash

HOMEDIR=`pwd`/..
export PYTHONPATH=`pwd`/localpythonlibraries/lib64/python3.5/site-packages/:`pwd`/localpythonlibraries/lib/python3.5/site-packages/
export RAILS_ENV=production
cd ..
pwd
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
cp ../control ${APP_DIR}/DEBIAN/control
export DEB_APP_DIR=${APP_DIR}/opt/app/
mkdir -p ${DEB_APP_DIR}
cp -R ../.bundle/ ${DEB_APP_DIR}
rsync -avz --exclude 'app/assets/' ../app ${DEB_APP_DIR}
cp -R ../bin/ ${DEB_APP_DIR}
cp -R ../config/ ${DEB_APP_DIR}
cp -R ../config.ru ${DEB_APP_DIR}
cp -R ../db/ ${DEB_APP_DIR}
cp -R ../Gemfile* ${DEB_APP_DIR}
cp -R ../gems/ ${DEB_APP_DIR}
cp -R ../lib/ ${DEB_APP_DIR}
cp -R ../log/ ${DEB_APP_DIR}
cp -R ../public/ ${DEB_APP_DIR}
mkdir ${DEB_APP_DIR}/public/uploads
cp -R ../Rakefile ${DEB_APP_DIR}
-sudo adduser --disabled-password deployer
sudo chown -R deployer:staff ${APP_DIR}
dpkg-deb -v --build app_${VERSION}
