import './App.scss';
import { Todo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState(usersFromServer);
  const todosFromServerWithUsers: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(todosFromServerWithUsers);

  const addTodo = (title: string, userId: number) => {
    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newTodo = {
      id: newId,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={users} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
