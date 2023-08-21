import React, { Fragment } from 'react';
import AddTodo from './AddTodo';
import ListTodos from './ListTodos';

const Todos = () => {
  return (
    <Fragment>
      <h3 className='text-center mt-5'>Todo List</h3>
      <AddTodo />
      <ListTodos /> 
    </Fragment>
  );
}

export default Todos;