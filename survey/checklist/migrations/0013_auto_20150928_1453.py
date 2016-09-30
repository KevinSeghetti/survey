# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def fix_notes_field (apps, schema_editor):
    Answer = apps.get_model("checklist", "Answer")
    for answer in Answer.objects.all():
        answer.notes = ""
        answer.save()


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0012_auto_20150928_1443'),
    ]

    operations = [
                migrations.RunPython(fix_notes_field),

    ]

