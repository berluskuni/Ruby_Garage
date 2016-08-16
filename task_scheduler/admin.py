from django.contrib import admin
from models import *


class SchedulerListAdmin(admin.ModelAdmin):
    list_display = ['task', 'condition', 'scheduler', 'task_id', 'count']


class SchedulerAdmin(admin.ModelAdmin):
    list_display = ['title', 'task_id']

admin.site.register(Scheduler, SchedulerAdmin)
admin.site.register(SchedulerList, SchedulerListAdmin)
