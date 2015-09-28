# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def fix_notes_field (apps, schema_editor):
    Question = apps.get_model("checklist", "Question")
    for question in Question.objects.all():
        question.notes = ""
        question.save()


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0011_auto_20150928_1437'),
    ]

    operations = [
                migrations.RunPython(fix_notes_field),

    ]
