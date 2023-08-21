import React, { Fragment, useState } from 'react';

const Login = ({ setPsqlUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async(e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data) {
        setPsqlUser(data);
      }
      console.log(data);
    }
    return (
      <Fragment>
        <h1>Login PlÆse</h1>
        <form className="d-flex mt-5" onSubmit={e => handleLogin(e)}>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-success">Login with PSQL</button>
        </form>
      </Fragment>
    );
  }

  export default Login;