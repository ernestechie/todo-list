const taskInput = document.querySelector('#task');
const addTaskButton = document.querySelector('.add-btn');
const taskList = document.querySelector('.task-collection');
const clearButton = document.querySelector('.clear-button');


// Load all event listeners
window.addEventListener('DOMContentLoaded', loadEventListeners);

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  taskList.addEventListener('click', removeTask);
  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('submit', addTask);
  clearButton.addEventListener('click', clearTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    
    const link = document.createElement('a');
    link.className = 'delete-task';
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });

}

// Adding tasks
function addTask(e) {
  
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  const link = document.createElement('a');
  link.className = 'delete-task';
  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  if (taskInput.value === '') {
    alert('Please add task!');
  } else {
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}

// Set Local storgae
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Removing tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-task')) {
    if (confirm('Proceed to delete task?')) {
      e.target.parentElement.parentElement.remove(); 
    }
  }
  e.preventDefault();
}

// Clearing tasks
function clearTasks() {
  if (confirm('Proceed to delete all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}