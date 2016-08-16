from django.shortcuts import render
from models import Scheduler, SchedulerList
from django.http import HttpResponse, JsonResponse


def scheduler_list(request):
    scheduler = Scheduler.objects.order_by('-id')
    task_list = SchedulerList.objects.all()
    if len(scheduler) == 0:
        return render(request, 'home.html')
    elif len(task_list) == 0:
        task_id = len(scheduler)
        return render(request, 'task_home.html', {'scheduler': scheduler, 'task_id': task_id})
    else:
        list_task = SchedulerList.objects.all()
        task_id = len(scheduler)
        return render(request, 'task_home.html', {'scheduler': scheduler, 'task_id': task_id, 'list_task': list_task})


def add_task(request):
    if request.method == "POST" and request.is_ajax():
        task = Scheduler(
            title=request.POST.get('task', ''),
            task_id=request.POST.get('task_id', '')
        )
        task.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def delete_task(request):
    if request.method == 'POST' and request.is_ajax():
        pk = request.POST.get('task_id', '')
        Scheduler.objects.filter(task_id=pk).delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def edit_task(request):
    if request.method == 'POST' and request.is_ajax():
        pk = request.POST.get('task_id', '')
        title = request.POST.get('task', '')
        Scheduler.objects.filter(task_id=pk).update(title=title)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def add_task_info(request):
    if request.method == 'POST' and request.is_ajax():
        task_id = request.POST.get('task', '').strip()
        task_count = request.POST.get('count', '').strip()
        scheduler = Scheduler.objects.filter(task_id=task_id)
        task_info = SchedulerList(
            task=request.POST.get('task_info', '').strip(),
            scheduler=scheduler[0],
            task_id=task_id,
            count=task_count,
        )
        task_info.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def delete_task_info(request):
    if request.method == "POST" and request.is_ajax():
        task = request.POST.get('task', '')
        task_id = request.POST.get('task_id', '')
        queryset = SchedulerList.objects.filter(task=task, task_id=task_id)
        queryset.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def edit_task_info(request):
    if request.method == "POST" and request.is_ajax():
        task = request.POST.get('task', '')
        task_id = request.POST.get('task_id', '')
        new_task = request.POST.get('new_task', '')
        queryset = SchedulerList.objects.filter(task=task, task_id=task_id)
        queryset.update(task=new_task)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


def count():
    count_dict = {}
    task = Scheduler.objects.all()
    for t in task:
        s_list = SchedulerList.objects.filter(scheduler=t.id)
        if len(s_list) == 0:
            count_dict["info_id_" + t.task_id] = 0
        else:
            count_dict["info_id_" + t.task_id] = len(s_list)
    return count_dict


def task_done(request):
    if request.POST and request.is_ajax():
        task = request.POST.get('task', '')
        present = request.POST.get('present', '')
        task_id = request.POST.get('task_id', '')
        if present == '1':
            queryset = SchedulerList.objects.filter(task=task, task_id=task_id)
            queryset.update(condition=True)
            return HttpResponse(status=200)
        elif present == '0':
            queryset = SchedulerList.objects.filter(task=task, task_id=task_id)
            queryset.update(condition=False)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)


def count_info(request):
    data = count()
    if request.method == "GET":
        return JsonResponse(data, content_type="application/json")