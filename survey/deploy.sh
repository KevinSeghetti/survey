#!/bin/sh

# scp -r * tenettiquiz2@tenetti.org:~/quiz.tenetti.org/quiz

rsync --exclude '*.sq3'  --exclude 'survey.vp*' --exclude passenger_swgi.py  -axvz . -e ssh tenettiquiz2@tenetti.org:~/quiz.tenetti.org/quiz
scp passenger_wsgi.py  tenettiquiz2@quiz.tenetti.org:~/quiz.tenetti.org
ssh  tenettiquiz2@quiz.tenetti.org "source venv/bin/activate.csh ; cd quiz.tenetti.org/quiz; ./manage.py migrate ; ./manage.py collectstatic --noinput"
ssh  tenettiquiz2@quiz.tenetti.org "touch quiz.tenetti.org/tmp/restart.txt"
