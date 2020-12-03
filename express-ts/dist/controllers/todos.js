"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const Todos = []; //after server its off we get erased
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    Todos.push(newTodo);
    return res.status(201).json({ message: 'all Good my boy' });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    return res.status(201).json({ todos: Todos });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = Todos.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('NO index');
    }
    Todos[todoIndex] = new todo_1.Todo(Todos[todoIndex].id, updatedText);
    return res.json({ message: 'Updated!', updatedTodo: Todos[todoIndex] });
};
exports.updateTodo = updateTodo;
