'use strict';

// VARIABLES

const todoItems = [];
const newTodo = document.querySelector('.newTodo');
const todoList = document.querySelector('.todos');
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos');
const completedTodosDiv = document.querySelector('.completed-todos');
const completedTitle = document.querySelector('.completed-title');

// FUNCTIONS

function createNewTodoItem(todo) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.classList.add('w-5', 'h-5', 'accent-transparent');

  const span = document.createElement('span');
  span.classList.add('flex', 'items-center', 'gap-3');
  const text = document.createTextNode(todo.text);
  span.appendChild(input);
  span.appendChild(text);

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');

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

function deleteTodoItem() {}

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
}

// EVENTS

newTodo.addEventListener('keyup', (e) => {
  let inputText = e.target.value;
  // Prüft, ob ein Wert eingegeben und die Enter-Taste gedrückt wurde
  if (inputText && e.keyCode === 13) {
    addTodo(inputText);
    newTodo.value = '';
  }
});
