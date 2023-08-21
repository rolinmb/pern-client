import React, { Fragment } from 'react';
import AddTodo from './AddTodo';
import ListTodos from './ListTodos';

const Todos = () => {
  return (
    <Fragment>
      <h2 className='text-center mt-5'>Todo List</h2>
      <AddTodo />
      <ListTodos /> 
    </Fragment>
  );
}

export default Todos;