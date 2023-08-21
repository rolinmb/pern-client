import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Todos from './todo/Todos';
import Users from './user/Users';

const Home = ({ psqlUser }) => {
  return (
    <Fragment>
      <h2>Hello {psqlUser.firstname} {psqlUser.lastname}!</h2>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='' element={<Todos />} />
          <Route path='/' element={<Todos />} />
          <Route path='/home' element={<Todos />} />
          <Route path='/todo' element={<Todos />} />
          <Route path='/todolist' element={<Todos />} />
          <Route path='/userlist' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default Home;