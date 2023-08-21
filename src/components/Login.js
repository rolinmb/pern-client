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
      if (data.success) {
        sessionStorage.setItem('psql_user', JSON.stringify(data));
        setPsqlUser(data);
      } else {
        console.log(data);
      }
    }
    return (
      <Fragment>
        <div className='login-container'>
          <h1 className='ml-5 login-header'>PlÆse Login</h1>
          <form className='d-flex mt-5 justify-content-center login-form' onSubmit={e => handleLogin(e)}>
            <input type='text' className='form-control mb-3' placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input type='password' className='form-control mb-3' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <button className='btn btn-success btn-block'>Login with PSQL</button>
          </form>
        </div>
      </Fragment>
    );
  }

  export default Login;