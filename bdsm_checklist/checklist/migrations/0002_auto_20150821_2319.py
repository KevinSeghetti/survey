# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('essential', models.BooleanField()),
                ('curious', models.BooleanField()),
                ('soft_limit', models.BooleanField()),
                ('hard_limit', models.BooleanField()),
                ('have_done', models.BooleanField()),
                ('rating', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='choice',
            name='question',
        ),
        migrations.DeleteModel(
            name='Choice',
        ),
    ]
