import React, { Fragment } from 'react';
import Todos from './Todos';
import Users from './Users';

const Home = () => {
    return (
        <Fragment>
            <Todos />
            <Users />
        </Fragment>
    );
}

export default Home;