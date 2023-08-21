import React, { Fragment, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [psqlUser, setPsqlUser] = useState(null);
  return (
    <Fragment>
      <div className="app-container">
        <header>
          <h1 className="text-center mt-5">PERN-App</h1>
        </header>
        <main>
          { psqlUser && psqlUser.success ? <Home /> : <Login setPsqlUser={setPsqlUser} /> }
        </main>
      </div>
    </Fragment>
  );
}

export default App;