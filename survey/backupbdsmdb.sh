#!/bin/sh

# script to back up produciton db:

scp tenettiquiz2@tenetti.org:~/quiz.tenetti.org/quiz/survey/survey.sq3 survey_database_backup_`date '+%Y%m%d'`.sq3

