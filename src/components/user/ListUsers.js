import React, { Fragment, useEffect, useState } from 'react';
import EditUser from './EditUser';

const ListUsers = ({ psqlUser }) => {
  const [users, setUsers] = useState([]);
  const deleteUser = async(id) => {
    try {
      const response = await fetch('http://localhost:5000/users/'+String(id),
        {method: "DELETE"});
      setUsers(users.filter(user => user.user_id !== id));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }
  const getUsers = async() => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Fragment>
      <div className='list-container'>
        <table className='table mt-5 text-center'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Standard/Admin User</th>
              <th>{psqlUser.is_admin ? 'Edit': null}</th>
              <th>{psqlUser.is_admin ? 'Delete' : null }</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.first_name}</td>
              <td>{user.middle_name}</td>
              <td>{user.last_name}</td>
              <td>{user.is_admin ? 'Admin' : 'Standard User'}</td>
              <td>{psqlUser.is_admin ? <EditUser user={user} /> : null}</td>
              <td>
                {psqlUser.is_admin ?
                  <button className='btn btn-danger' onClick={() => deleteUser(user.user_id)}>Delete User</button>
                  : null}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListUsers;