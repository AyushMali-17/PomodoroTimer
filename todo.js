// To-Do List-related JavaScript logic

document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            const li = document.createElement('li');
            li.textContent = newTodo;
            todoList.appendChild(li);
            newTodoInput.value = '';
        }
    });
});
