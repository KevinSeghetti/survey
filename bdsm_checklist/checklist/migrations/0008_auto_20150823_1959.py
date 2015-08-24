# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0007_auto_20150823_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='context',
            field=models.CharField(max_length=10, choices=[('to_me', 'Done to me'), ('to_others', 'I have done to others')]),
        ),
    ]
