# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0013_auto_20150928_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='notes',
            field=models.TextField(default='', blank=True),
        ),
    ]
