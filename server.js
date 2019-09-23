var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

var todoList = [
    {
        // id: uuid(),
        id: 1,
        todo: "Implement a REST API"
    }, 
    {
        // id: uuid(),
        id: 2,
        todo: "get lunch"
    }, 
    {
        // id: uuid(),
        id: 3,
        todo: "make websites"
    }, 
    
];

function fetchTodoById(id) {
    const todoItem = todoList.find(function(todo) {
        return todo.id.toString() === id
    })

    return todoItem
}

// GET /api/todos
// This should respond with the full list of todo items.
app.get('/api/todos', function(request, response, nextFn) {
    console.log("todo list requested")
    response.send(todoList)
})

// GET /api/todos/:id
// This should respond with the information for the matching todo item
// by id.
// If the matching todo does not exist, the server should respond
// with a 404 status code.
app.get('/api/todos/:id', function(request, response, nextFn) {

    const requestedTodoItem = fetchTodoById(request.params.id)

    if (requestedTodoItem !== undefined) {
        console.log("Todo item id '" + requestedTodoItem.id + "' requested")
        response.send(requestedTodoItem)
    } else {
        console.log("Requested todo item id '" + request.params.id + "' not found")
        response.sendStatus(404)
    }
})

// POST /api/todos
// This should take the body of the request and add it to todoList.
// Remember to generate a unique id for the new todo item.
// This endpoint should respond with the new item with it's id.
app.post('/api/todos', function(request, response, nextFn) {

    console.log("incoming post request")
    const todoString = request.body.todo;

    const newTodoObject = {
        id: uuid(),
        todo: todoString
    }

    todoList.push(newTodoObject)

    console.log("New todo item '" + newTodoObject.todo + "' posted with id '" + newTodoObject.id + "'")

    response.send(todoList)
})

// PUT /api/todos/:id
// This should update the matching todo item by id with the
// body of the request.  The endpoint should respond with the
// updated item.
// If the matching todo does not exist, the server should respond
// with a 404 status code.
app.put('/api/todos/:id', function (request, response, nextFn) {
    const todoItem = fetchTodoById(request.params.id)

    if (todoItem === undefined) {
        response.sendStatus(404)
        return
    }

    const updates = request.body

    const updatedTodo = Object.assign(todoItem, updates)

    console.log("Todo item id '" + updatedTodo.id + "' task changed to '" + updatedTodo.todo + "'")

    response.send(todoList)

})

// DELETE /api/todos/:id
// This should remove the matching item from the list of todo items.
// This endpoint should respond with the new length of the list.
// If the matching todo does not exist, the server should respond
// with a 404 status code.
app.delete('/api/todos/:id', function (request, response, nextFn) { 
    const todoItem = fetchTodoById(request.params.id)
    
    if (todoItem === undefined) {
        response.sendStatus(404)
        return
    }

    console.log(todoItem)

    const todoItemId = todoItem.id

    var index = todoList.map(function (element) {return element.id}).indexOf(todoItemId)

    todoList.splice(index, 1)

    console.log("Todo item id '" + todoItemId + "' deleted at index " + index)

    response.send(todoList)
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})