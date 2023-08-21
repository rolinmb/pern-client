import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [psqlUser, setPsqlUser] = useState(null);
  useEffect(() => {
    const storedPsqlUser = sessionStorage.getItem('psql_user');
    if (storedPsqlUser) {
      setPsqlUser(JSON.parse(storedPsqlUser));
    }
  }, []);
  return (
    <Fragment>
      <div className="app-container">
        <header>
          { (psqlUser && psqlUser.success) ? 
            <h2 className="user-info">
              Hello {psqlUser.first_name} {psqlUser.last_name}!
              <br />
              <i>{ psqlUser.is_admin ? '(Admin)' : '(Standard User)'}</i>
              <Logout psqlUser={psqlUser} setPsqlUser={setPsqlUser} />
            </h2>
            :
            <h1 className="text-center mt-5">PERN-App</h1>
          }
        </header>
        <main className='main-content'>
          { (psqlUser && psqlUser.success) ?
            <Home psqlUser={psqlUser} /> : <Login setPsqlUser={setPsqlUser} />
          }
        </main>
      </div>
    </Fragment>
  );
}

const Logout = ({ psqlUser, setPsqlUser }) => {
  const clearPsqlUser = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('psql_user');
    setPsqlUser(null);
  }
  return (
    <button className='btn btn-success logout-button' onClick={e => clearPsqlUser(e)}>Logout {psqlUser.username}</button>
  );
}

export default App;