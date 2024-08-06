document.addEventListener('DOMContentLoaded', function() {
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    addTodoBtn.addEventListener('click', function() {
        const task = todoInput.value;
        if (task) {
            const li = document.createElement('li');
            li.textContent = task;
            li.addEventListener('click', function() {
                li.remove();
            });
            todoList.appendChild(li);
            todoInput.value = '';
        }
    });
});
