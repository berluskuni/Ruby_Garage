from django.conf.urls import patterns, include, url
from django.contrib import admin
from task_scheduler.views import *

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'RubyGarage.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', scheduler_list, name='home'),
                       url(r'^add_task/$', add_task, name='add_task'),
                       url(r'^delete_task/$', delete_task, name='delete_task'),
                       url(r'^edit_task/$', edit_task, name='edit_task'),
                       url(r'^task_info/$', add_task_info, name='add_task_info'),
                       url(r'^task_info_delete/$', delete_task_info, name='delete_task_info'),
                       url(r'^task_info_edit/$', edit_task_info, name='edit_task_info'),
                       url(r'^count_info/$', count_info, name='count_info'),
                       url(r'^task_done/$', task_done, name='task_done'),

                       )
