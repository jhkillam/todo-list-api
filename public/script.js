console.log("hello world")

function postData(url, data) {
// Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

function deleteTodo(url) {
    
}
  
function renderTodos() {
    fetch('/api/todos')
        .then(function(response){
            console.log("requesting todo list...")
            return response.json()
        })
        .then(function(myJson){
            console.log(myJson)
            return myJson
        })
        .then(function (todos) {
            console.log("render function started...")
            console.log(todos)
            let div = document.getElementById("todos")
            const todoDom = todos.map((el) => {
                return `<div class="todo-txt">${el.todo}</div>
                <input class="done-btn" type="submit" value="Done"><input id="${el.id}" class="delete-btn" type="submit" value="Delete">`
            })
            div.innerHTML = todoDom.join("")
        })
}

renderTodos()

const addBtn = document.getElementById('add-btn')

addBtn.addEventListener('click', function() {
    console.log("add btn clicked")
    const todoString = document.getElementById("userInput").value;

    const promise = postData('/api/todos', {todo: todoString});

    promise.then(function(response) {
        renderTodos(response);
    });
})

const deleteBtn = document.getElementsByClassName("delete-btn")

deleteBtn.addEventListener('click', function() {
    console.log("delete btn clicked")

})