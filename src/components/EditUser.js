import React, { Fragment, useState } from "react";

const EditUser = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [first_name, setFirst] = useState(user.first_name);
  const [middle_name, setMiddle] = useState(user.middle_name);
  const [last_name, setLast] = useState(user.last_name);

  const updateUser = async(e) => {
    e.preventDefault();
    try {
      const body = { username, password, first_name, middle_name, last_name };
      const response = await fetch("http://localhost:5000/users/"+user.user_id,
        {
          method: "PUT",
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

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={'#id'+user.user_id}>
        Edit User
      </button>
      <div className="modal" id={'id'+user.user_id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit User</h4>
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateUser(e)}>Submit Changes</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditUser;