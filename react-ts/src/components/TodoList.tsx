import React from 'react';
import './TodoList.css';

interface todo {
    id: string;
    text: string;
}

export interface TodoListProps {
    todos:  todo[];
}

 //generic we can define extra PROPS
const TodoList: React.FC<TodoListProps> = (props) => {
    
    return (  
        <ul>
            {props.todos.map((todo) => {
                return <li key={todo.id}>{todo.text}</li>
            })}
        </ul>


    );
}
 
export default TodoList;