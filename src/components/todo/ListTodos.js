import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async(id) => {
    try {
      const response = await fetch('http://localhost:5000/todos/'+String(id),
        {method: "DELETE"});
      setTodos(todos.filter(todo => todo.todo_id !== id));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTodos = async() => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <div className='todo-list-container list-container'>
        <table className='table mt-3 text-center todo-table'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListTodos;