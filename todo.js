// Example functionality for the to-do list page
document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTodo = document.getElementById('newTodo').value;
        if (newTodo) {
            const li = document.createElement('li');
            li.textContent = newTodo;
            todoList.appendChild(li);
            document.getElementById('newTodo').value = '';
        }
    });
});
