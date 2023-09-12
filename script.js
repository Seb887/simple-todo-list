'use strict';

// VARIABLES

let todoItems = [
  { id: 1694376860080, text: 'task1', completed: false },
  { id: 1694376860081, text: 'task2', completed: false },
  { id: 1694376860082, text: 'task3', completed: false },
  { id: 1694376860082, text: 'task4', completed: true },
  { id: 1694376860082, text: 'task4', completed: true },
  { id: 1694376860082, text: 'task4', completed: true },
  { id: 1694376860082, text: 'task4', completed: true },
  // { id: 1694376860083, text: 'taskcomplete', completed: true },
];
const newTodo = document.querySelector('.newTodo');
const todoList = document.querySelector('.todos');
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos');
const completedTodosDiv = document.querySelector('.completed-todos');
const completedTitle = document.querySelector('.completed-title');
const removeTodo = document.querySelectorAll('.remove-todo');

// FUNCTIONS

function createNewTodoItem(todo) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.classList.add('check-todo', 'w-5', 'h-5', 'accent-transparent');

  const span = document.createElement('span');
  span.classList.add('flex', 'items-center', 'gap-3');
  const text = document.createTextNode(todo.text);
  span.appendChild(input);
  span.appendChild(text);

  const icon = document.createElement('i');
  icon.classList.add('remove-todo', 'fa-solid', 'fa-xmark');

  const div = document.createElement('div');
  div.classList.add(
    'todo-item',
    'flex',
    'justify-between',
    'items-center',
    'p-3',
    'rounded-lg',
    'bg-[#ffffff]'
  );
  div.id = todo.id;
  div.appendChild(span);
  div.appendChild(icon);

  return div;
}

function addTodo(text) {
  todoItems.push({ id: Date.now(), text, completed: false });
  // console.log(todoItems);
  refreshUI();
}

function setCompleted(e) {
  let target = e.target;

  if (target.classList.contains('check-todo')) {
    target.se;
    // target.setAttribute('checked');
  }
}

function deleteTodoItem(e) {
  if (e.target.classList.contains('remove-todo')) {
    // ID des zu löschenden Todos inkl. Wandlung in eine Zahl
    let todoId = e.target.parentElement.id;
    todoId = parseInt(todoId);

    todoItems = todoItems.filter((item) => item.id !== todoId);

    console.log(todoItems);
  }

  refreshUI();
}

function counter(arr) {
  const counter = document.querySelector('.counter');
  const completedCounter = document.querySelector('.completed-counter');

  counter.textContent = todoItems.length;
  completedCounter.textContent = arr.length;
}

function refreshUI() {
  // Filtert nach nicht erledigten Aufgaben -> gibt Array zurück
  const uncompletedTodos = todoItems.filter((item) => !item.completed);
  // Filtert nach erledigten Aufgaben -> gibt Array zurück
  const completedTodos = todoItems.filter((item) => item.completed);

  // Löscht den Inhalt der DIVs
  uncompletedTodosDiv.innerHTML = '';
  completedTodosDiv.innerHTML = '';

  // Checkt das Array ob es leer ist und lässt, wenn nicht, die DOM erstellen
  if (uncompletedTodos.length > 0) {
    for (let todo of uncompletedTodos) {
      uncompletedTodosDiv.appendChild(createNewTodoItem(todo));
    }
  }

  // Checkt das Array ob es leer ist und lässt, wenn nicht, die DOM erstellen
  if (completedTodos.length > 0) {
    for (let todo of completedTodos) {
      completedTodosDiv.appendChild(createNewTodoItem(todo));
    }
  }

  counter(completedTodos);
}

// EVENTS

window.onload = refreshUI;

newTodo.addEventListener('keyup', (e) => {
  let inputText = e.target.value;
  // Prüft, ob ein Wert eingegeben und die Enter-Taste gedrückt wurde
  if (inputText && e.keyCode === 13) {
    addTodo(inputText);
    newTodo.value = '';
  }
});

todoList.addEventListener('click', deleteTodoItem);
todoList.addEventListener('click', setCompleted);
