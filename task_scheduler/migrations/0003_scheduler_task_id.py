# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_scheduler', '0002_auto_20160802_1303'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduler',
            name='task_id',
            field=models.CharField(max_length=50, verbose_name='ID \u0437\u0430\u0434\u0430\u0447\u0438', blank=True),
            preserve_default=True,
        ),
    ]
