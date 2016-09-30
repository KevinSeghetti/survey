#!/bin/bash

npm install

node_modules/.bin/webpack -p
./manage.py migrate -v 0
./manage.py collectstatic --noinput -i jsx -i '*.scss' -v 0
./manage.py collectstatic --clear --noinput -i jsx -i '*.scss' -v 0
./manage.py compilestatic

sudo service apache2 restart




