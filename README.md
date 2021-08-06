# Simple Task Manager web application

## Getting Started

1. Download this repository
2. Download and install [python](https://www.python.org/downloads/release/python-3711/){:target="_blank"}
3. Create new `virtual environment`
   
  ```terminal
  python -m venv venv-name
  ```
4. Activate virtual environment
5. Upgrade `pip`
   
  ```terminal
  pip install --upgrade pip
  ```
6. Install project dependencies
  ```terminal
  pip install -r requirements.txt
  ```
7. Run the following command to migrate to the database.
  ```terminal
  python manage.py makemigrations
  ```
  ```terminal
  python manage.py migrate
  ```

8. Navigate to project root and run the following command to start the project.
  ```terminal
  python manage.py runserver
  ```

# Screenshots

#### Landing Page
<div class="row  justify-content-center">
  <img class="img-fluid text-center" src = "https://github.com/macjade/todo/blob/main/images/landingpage.PNG" width="50%" height="50%">
</div>
<br>

#### Task Listing Page
<div class="row  justify-content-center">
  <img class="img-fluid text-center" src = "https://github.com/macjade/todo/blob/main/images/task.PNG" width="50%" height="50%">
</div>
<br>

#### Add Task
<div class="row  justify-content-center">
  <img class="img-fluid text-center" src = "https://github.com/macjade/todo/blob/main/images/addtask.PNG" width="50%" height="50%">
</div>
<br>

## Authors

* @macjade - https://jamesmaduka.com/