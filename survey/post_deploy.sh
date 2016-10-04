#!/bin/bash

npm install

node_modules/.bin/webpack -p
./manage.py migrate -v 0
./manage.py collectstatic --noinput -i jsx -i '*.scss' -v 0
./manage.py collectstatic --clear --noinput -i jsx -i '*.scss' -v 0
./manage.py compilestatic

# sqlite needs to be able to write to parent directory of sq3 file
sudo chgrp www-data survey
sudo chgrp www-data survey/bdsm_checklist.sq3
sudo chgrp www-data survey/sports_checklist.sq3

sudo service apache2 restart




