import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Fragment>
      <ul className='list-group align-items-center nav-container'>
        <li className='nav-item'><Link className='nav-link' to='/todolist'>Todo List</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/userlist'>Users</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/studio'>Studio</Link></li>
      </ul>
    </Fragment>
  );
}

export default Nav;