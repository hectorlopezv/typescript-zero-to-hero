import {RequestHandler} from 'express';
import {Todo} from '../models/todo';
interface reqBody {
    text: string;
}

const Todos: Todo[] = []; //after server its off we get erased

export const createTodo:RequestHandler = (req, res, next) => {
    const text = (<reqBody>req.body).text;
    const newTodo = new Todo(Math.random().toString(), text);
    Todos.push(newTodo);

    return res.status(201).json({message: 'all Good my boy'});

}

export const getTodos: RequestHandler = (req, res, next) => {
   return res.status(201).json({todos: Todos});
}


export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {

    const todoId = req.params.id;
    const updatedText =   (req.body as {text: string}).text;
    const todoIndex =  Todos.findIndex(todo => todo.id === todoId);
    if(todoIndex < 0){
        throw new Error('NO index')
    }

    Todos[todoIndex] = new Todo(Todos[todoIndex].id, updatedText);
    return res.json({message: 'Updated!', updatedTodo: Todos[todoIndex] });
}
