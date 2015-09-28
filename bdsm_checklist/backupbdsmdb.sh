#!/bin/sh

# script to back up produciton db:

scp tenettiquiz2@tenetti.org:~/quiz.tenetti.org/quiz/bdsm_checklist/bdsm_checklist.sq3 bdsm_checklist_database_backup_`date '+%Y%m%d'`.sq3

