# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0004_question_question_detail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='pub_date',
        ),
    ]
