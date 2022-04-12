const taskInput = document.querySelector('#task');
const addTaskButton = document.querySelector('.add-btn');
const taskList = document.querySelector('.task-collection');
const clearButton = document.querySelector('.clear-tasks-button');
const modalCloseButton = document.querySelector('.close-modal-button');
const modalHeader = document.querySelector('.modal-header');
const modal = document.querySelector('.modal-overlay');

// Load all event listeners
loadEventListeners();

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
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      
      const link = document.createElement('a');
      link.className = 'delete-task';
      // link.innerHTML = `<i class="fas fa-trash-alt delete-button"></i>`;
      link.innerHTML = `<ion-icon name="close"></ion-icon>`;
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}

// Adding tasks
function addTask(e) {
  
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  const link = document.createElement('a');
  link.className = 'delete-task';
  // link.innerHTML = `<i class="fas fa-trash-alt delete-button"></i>`;
  link.innerHTML = '<ion-icon name="close"></ion-icon>';

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
  let element = e.target.parentElement.parentElement;
  if (e.target.parentElement.classList.contains('delete-task')) {
      
    (() => {
      modal.style.display = 'block'

      window.addEventListener('click', (e) => {
        if (e.target.className === 'modal-overlay') {
          modal.style.display = 'none';
        }
      });

      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-button') || e.target.className === 'button button-primary') {
          modal.style.display = 'none';
        } else if (e.target.className === 'button clear-button') {
          modal.style.display = 'none';
          element.remove();
          removeFromLocalStorage(element);
        }
      });
    })();
  }
}

// Remove tasks from locals storage
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clearing tasks from DOM
function clearTasks(e) {
  console.log(e.target);
  if (e.target.classList.contains('clear-button')) {
    (() => {
      modal.style.display = 'block'

      window.addEventListener('click', (e) => {
        if (e.target.className === 'modal-overlay') {
          modal.style.display = 'none';
        }
      });

      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-button') || e.target.className === 'button button-primary') {
          modal.style.display = 'none';
        } else if (e.target.className === 'button clear-button') {
          modal.style.display = 'none';
          while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
          }
          clearFromLocalStorage();
        }
      });
    })();
  }
  clearFromLocalStorage();
}

//Clearing tasks from local storage
function clearFromLocalStorage() {
  localStorage.clear();
}