# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0010_answer_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='notes',
            field=models.TextField(default=''),
        ),
    ]
