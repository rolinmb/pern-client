import React, { Fragment, useState } from "react";

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirst] = useState('');
  const [middle_name, setMiddle] = useState('');
  const [last_name, setLast] = useState('');
  const [is_admin, setIsAdmin] = useState(false);

  const createUser = async(e) => {
    e.preventDefault();
    try {
      const body = { username, password, first_name, middle_name, last_name, is_admin };
      const response = await fetch("http://localhost:5000/users",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }
      );
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleCheckClick = () => {
    setIsAdmin(!is_admin);
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#add-user-modal">
        Add New User
      </button>
      <div className="modal" id="add-user-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New User</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <p>Username:</p>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
              <p>Password:</p>
              <input type="text" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
              <p>First Name:</p>
              <input type="text" className="form-control" value={first_name} onChange={e => setFirst(e.target.value)} />
              <p>Middle Name:</p>
              <input type="text" className="form-control" value={middle_name} onChange={e => setMiddle(e.target.value)} />
              <p>Last Name:</p>
              <input type="text" className="form-control" value={last_name} onChange={e => setLast(e.target.value)} />
              <p>{is_admin ? 'Create as Admin' : 'Create as Standard User'}</p>
              <input type="checkbox" checked={is_admin} onChange={handleCheckClick} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={e => createUser(e)}>Create User</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddUser;