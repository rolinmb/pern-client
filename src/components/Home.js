import React, { Fragment } from 'react';
import Todos from './Todos';
import Users from './Users';

const Home = ({ psqlUser }) => {
  return (
    <Fragment>
      <h3>Hello {psqlUser.firstname} {psqlUser.lastname}!</h3>
      <Todos />
      <Users />
    </Fragment>
  );
}



export default Home;