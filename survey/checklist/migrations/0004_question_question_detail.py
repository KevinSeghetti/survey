# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0003_answer_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question_detail',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
