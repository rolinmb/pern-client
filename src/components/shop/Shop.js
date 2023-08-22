import React, { Fragment } from 'react';
import AddItem from './AddItem';
import ListItems from './ListItems';

const Shop = ({ psqlUser }) => {
  return (
    <Fragment>
      <h3 className='text-center mt-5 page-header-main'>Shop</h3>
      { psqlUser.is_admin ? <AddItem /> : null }
      <ListItems psqlUser={psqlUser} />
    </Fragment>
  );
}

export default Shop;