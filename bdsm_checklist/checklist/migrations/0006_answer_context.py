# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0005_remove_question_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='context',
            field=models.CharField(default='to_me', max_length=10),
            preserve_default=False,
        ),
    ]
