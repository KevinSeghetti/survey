#!/bin/bash

./manage.py migrate -v 0
./manage.py collectstatic --noinput -i jsx -i '*.scss' -v 0
./manage.py collectstatic --clear --noinput -i jsx -i '*.scss' -v 0
./manage.py compilestatic





