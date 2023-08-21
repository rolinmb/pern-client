import React, { Fragment, useEffect, useState } from 'react';
import EditUser from './EditUser';

const ListUsers = () => {
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
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
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
            <td><EditUser user={user} /></td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteUser(user.user_id)}>Delete User</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListUsers;