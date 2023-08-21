import React, { Fragment } from 'react';
import AddUser from './AddUser';
import ListUsers from './ListUsers';

const Users = () => {
  return (
    <Fragment>
      <h2 className='text-center mt-5'>Users</h2>
      <AddUser />
      <ListUsers />
    </Fragment>
  );
}

export default Users;