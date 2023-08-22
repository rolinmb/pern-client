import React, { Fragment } from 'react';
import AddOrder from './AddOrder';
import ListOrders from './ListOrders';

const Orders = ({ psqlUser }) => {
  return (
    <Fragment>
      <h3 className='text-center mt-5 page-header-main'>{psqlUser.is_admin ? 'Orders' : 'Orders for '+psqlUser.username }</h3>
      <AddOrder psqlUser={psqlUser} />
      <ListOrders psqlUser={psqlUser} />
    </Fragment>
  );
}

export default Orders;