#!/bin/bash

# first run fedora-setup.sh 

# do resetdb first

pip install --upgrade pip

pushd ..
./pipsetup.py /home/kts/kts/survey/venv/
popd
#pip install django==1.8.4
#pip install django-mysql==0.2.2
#pip install djangorestframework
#pip install markdown
#
#pip install djangorestframework
#pip install django-static-precompiler
#
#pip install django-registration-redux==1.2
#
#pip install httpie
#pip install django-webpack-loader

npm install

#python manage.py createsuperuser
echo "from django.contrib.auth.models import User; User.objects.create_superuser('kts', 'kts@tenetti.org', 'jdo08589fj2')" | ./manage.py shell

python manage.py migrate
python manage.py loaddata question.fixture.json
#python manage.py runserver


