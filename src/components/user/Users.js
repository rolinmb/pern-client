import React, { Fragment } from 'react';
import AddUser from './AddUser';
import ListUsers from './ListUsers';

const Users = ({ psqlUser }) => {
  return (
    <Fragment>
      <h3 className='text-center mt-5 page-header-main'>Users</h3>
      { psqlUser.is_admin ? <AddUser /> : null }
      <ListUsers psqlUser={ psqlUser }/>
    </Fragment>
  );
}

export default Users;