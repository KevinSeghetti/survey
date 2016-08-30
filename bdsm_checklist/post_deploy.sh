#!/bin/bash

./manage.py migrate -v 0
./manage.py collectstatic --noinput -i jsx -v 0
./manage.py collectstatic --clear --noinput -i jsx -v 0
./manage.py compilestatic





