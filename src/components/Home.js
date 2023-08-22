import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Todos from './todo/Todos';
import Users from './user/Users';
import PngStudio from './studio/PngStudio';
import Synth from './synth/Synth';
import Shop from './shop/Shop';
import Orders from './order/Orders';

const Home = ({ psqlUser }) => {
  return (
    <Fragment>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='' element={<Todos />} />
          <Route path='/' element={<Todos />} />
          <Route path='/home' element={<Todos />} />
          <Route path='/todo' element={<Todos />} />
          <Route path='/todolist' element={<Todos />} />
          <Route path='/userlist' element={<Users psqlUser={psqlUser} />} />
          <Route path='/studio' element={<PngStudio />} />
          <Route path='/synth' element={<Synth />}/>
          <Route path='/shop' element={<Shop psqlUser={psqlUser} />}/>
          <Route path='/orders' element={<Orders psqlUser={psqlUser} />}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default Home;