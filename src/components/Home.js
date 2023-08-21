import React, { Fragment } from 'react';
import Todo from './Todo';
import Users from './Users';

const Home = () => {
    return (
        <Fragment>
            <Todo />
            <Users />
        </Fragment>
    );
}

export default Home;