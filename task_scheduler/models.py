# coding=utf-8
from django.db import models


class Scheduler(models.Model):
    title = models.CharField(max_length=1024, verbose_name=u'Планировщик', blank=False)
    task_id = models.CharField(max_length=50, verbose_name=u'ID задачи', blank=True)

    def __unicode__(self):
        return self.title


class SchedulerList(models.Model):
    task = models.CharField(max_length=1024, verbose_name=u'Задача', blank=False)
    condition = models.BooleanField(default=False)
    scheduler = models.ForeignKey(Scheduler)
    task_id = models.CharField(max_length=50, verbose_name=u'ID задачи', blank=True)
    count = models.IntegerField(max_length=50, verbose_name=u'Порядковый номер', blank=True, default=0)

    def __unicode__(self):
        return self.task