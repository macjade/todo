from django.shortcuts import render, redirect
from django.views import generic
from django.http import JsonResponse
from .models import Project, Task

import urllib.parse

# Create your views here.

class Home(generic.View):

    def get(self, request):
        return render(request, 'home/index.html')

    def post(self, request):
        name = request.POST['project_name']
        check_name = Project().find_projects(name)
        if check_name:
            return redirect('home:project', name=urllib.parse.quote(check_name[0].name))
        else:
            pj = Project().new_project(name)
            return redirect('home:project', name=urllib.parse.quote(pj.name))


class ProjectTask(generic.View):

    def get(self, request, **kwargs):
        context = {
            'name': urllib.parse.unquote(kwargs.get('name')),
        }
        gettasks = Task().get_all_task(urllib.parse.unquote(kwargs.get('name')))
        context['pending_task'] = gettasks.get('pending')
        context['completed_task'] = gettasks.get('completed')

        return render(request, 'home/task.html', context=context)

class AddNewTask(generic.View):

    def post(self, request, **kwargs):

        data = {}

        name = urllib.parse.unquote(kwargs.get('name'))
        task = request.POST['task-name']
        status = 'Pending'
        new_task = Task().add_task(name, task, status)

        data['status'] = True
        data['id'] = new_task.pk
        data['task'] = new_task.task
        data['date'] = new_task.date_of_add.date()
        return JsonResponse(data)

class Togglecheck(generic.View):

    def get(self, request, **kwargs):

        data = {}
        changecheck = Task().changecheck(str(request.GET['id']).replace('task_', ''))

        data['status'] = changecheck

        return JsonResponse(data)

class EditTask(generic.View):

    def post(self, request, **kwargs):
        data = {}
        edittask = Task().edittask(str(request.POST['id']).replace('change_task_', ''), request.POST['name'])

        data['status'] = edittask
        data['pk'] = str(request.POST['id']).replace('change_task_', '')
        data['task'] = request.POST['name']



        return JsonResponse(data)

class DeleteTask(generic.View):

    def post(self, request, **kwargs):

        data = {}
        deletetask = Task().deletetask(str(request.POST['id']).replace('task_', ''))

        data['status'] = deletetask

        return JsonResponse(data)