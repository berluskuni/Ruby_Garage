# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_scheduler', '0004_schedulerlist_task_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedulerlist',
            name='count',
            field=models.IntegerField(default=0, max_length=50, verbose_name='\u041f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440', blank=True),
            preserve_default=True,
        ),
    ]
