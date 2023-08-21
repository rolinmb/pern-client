import React, { Fragment } from 'react';
import InputTodo from './InputTodo';
import ListTodos from './ListTodos';

const Todo = () => {
    return (
        <Fragment>
            <h2 className="text-center mt-5">Todo List</h2>
            <InputTodo />
            <ListTodos /> 
        </Fragment>
    );
}

export default Todo;