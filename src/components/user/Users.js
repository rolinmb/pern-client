import React, { Fragment } from 'react';
import AddUser from './AddUser';
import ListUsers from './ListUsers';

const Users = () => {
  return (
    <Fragment>
      <h3 className='text-center mt-5'>Application Users</h3>
      <AddUser />
      <ListUsers />
    </Fragment>
  );
}

export default Users;