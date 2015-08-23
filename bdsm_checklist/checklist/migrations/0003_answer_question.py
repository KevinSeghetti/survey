# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0002_auto_20150821_2319'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(to='checklist.Question', default=0),
            preserve_default=False,
        ),
    ]
