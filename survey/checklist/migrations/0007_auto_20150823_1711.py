# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0006_answer_context'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='curious',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='essential',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='hard_limit',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='have_done',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='rating',
            field=models.IntegerField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='soft_limit',
            field=models.BooleanField(default=False),
        ),
    ]
