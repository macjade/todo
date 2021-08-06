from django.db import models
from django.utils import timezone
# Create your models here.

class Project(models.Model):

    name = models.CharField(default="", unique=True, max_length=255)
    date_of_creation = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def new_project(self, name):

        if not name:
            raise ValueError('Project name is important')

        new_proj = self
        new_proj.name = name
        new_proj.save()
        return new_proj


    def find_projects(self, name):
        if not name:
            raise ValueError('Project name is important')

        find_projects = self.__class__
        return find_projects.objects.filter(name=name)


class Task(models.Model):

    TASK_STATUS = {
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    }

    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    task = models.TextField(default="")
    status = models.CharField(max_length=255, default="Pending", choices=TASK_STATUS)
    date_of_add = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.task + " - " + self.status

    def add_task(self, name, task, status):

        addtask = self
        check_project = Project.objects.filter(name=name)
        if check_project:
            addtask.project_id = Project.objects.get(name=name)
            addtask.task = task
            addtask.status = status
            addtask.save()
        else:
            Project().new_project(name)
            self.add_task(name, task, status)

        return addtask

    def edit_task(self, id, task=None, status=None):

        edittask = self.__class__.object.get(pk=id)
        edittask.task = task if task != None else edittask.task
        edittask.status = status if status != None else edittask.status
        edittask.save()

        return edittask

    def get_all_task(self, name):
        pending_task = []
        completed_task = []

        alltask = self.__class__.objects.filter(project_id=Project.objects.get(name=name).pk)

        for gettask in alltask:

            if gettask.status == 'Pending':
                pending_task.append(gettask)
            else:
                completed_task.append(gettask)

        return({'pending': pending_task, 'completed': completed_task})

    def changecheck(self, id):

        try:
            check = self.__class__.objects.get(pk=int(id))
            check.status = 'Pending' if check.status == 'Completed' else 'Completed'
            check.save()
            return True
        except:
            return False

    def deletetask(self, id):

        try:
            check = self.__class__.objects.get(pk=int(id)).delete()
            return True
        except:
            return False

    def edittask(self, id, name):

        try:
            check = self.__class__.objects.get(pk=int(id))
            check.task = name
            check.status = 'Pending'
            check.save()
            return True
        except:
            return False
