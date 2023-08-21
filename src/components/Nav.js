import React, { Fragment } from 'react';
import  { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Fragment>
      <ul className='list-group'>
        <li><Link className='list-group-item' to='/todolist'>Todo List</Link></li>
        <li><Link className='list-group-item' to='/userlist'>Users</Link></li>
      </ul>
    </Fragment>
  );
}

export default Nav;