let todoInput = document.getElementById("todo-input");
let addTodoButton = document.getElementById("add-todo");
let todoList = document.getElementById("todo-list");

let loadTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodoToDOM(todo));
};

let saveTodos = () => {
    let todos = Array.from(todoList.children).map(
        (item) => item.querySelector(".todo-text").textContent
    );
    localStorage.setItem("todos", JSON.stringify(todos));
};

let addTodoToDOM = (todoText) => {
    let li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todoText;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        li.remove();
        saveTodos();
    };

    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
};

addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        addTodoToDOM(todoText);
        saveTodos();
        todoInput.value = "";
    }
});

loadTodos();
