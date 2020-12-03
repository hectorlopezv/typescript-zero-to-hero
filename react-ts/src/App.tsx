import React, {useState} from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

interface Todo {
  id: string;
  text: string;
}
export interface AppProps {
  
}
 
const App: React.FunctionComponent<AppProps> = () => {
  const [Todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
      
    setTodos(lastestTodos  => {
        return [...lastestTodos, {id: Math.random().toString(), text: text}]
    });
  };
  

  return (
    <div className="App">
      < NewTodo 
        onAddTodo={todoAddHandler}
      />
      {/* a components that adds todos */}
      <TodoList todos={Todos}

      />
    </div>
  );
}

export default App;
