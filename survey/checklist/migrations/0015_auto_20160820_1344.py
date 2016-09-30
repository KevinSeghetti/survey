# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0014_auto_20160816_1830'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='rating',
            field=models.TextField(default=False),
        ),
    ]
