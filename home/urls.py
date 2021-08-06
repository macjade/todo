from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('project/<name>/', views.ProjectTask.as_view(), name='project'),
    path('project/<name>/addtask/', views.AddNewTask.as_view(), name='new_task'),
    path('project/<name>/toggletask/', views.Togglecheck.as_view(), name='change_task'),
    path('project/<name>/edittask/', views.EditTask.as_view(), name='edit_task'),
    path('project/<name>/deletetask/', views.DeleteTask.as_view(), name='delete_task'),
]