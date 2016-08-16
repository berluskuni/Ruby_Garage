# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Scheduler',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=1024, verbose_name='\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0449\u0438\u043a')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SchedulerList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('task', models.CharField(max_length=1024, verbose_name='\u0417\u0430\u0434\u0430\u0447\u0430')),
                ('condition', models.BooleanField()),
                ('scheduler', models.ForeignKey(to='task_scheduler.Scheduler')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
