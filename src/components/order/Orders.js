import React, { Fragment } from 'react';

const Orders = ({ psqlUser }) => {
  return (
    <Fragment>
      <h3 className='text-center mt-5 page-header-main'>{psqlUser.is_admin ? 'Orders' : 'Orders for '+psqlUser.username }</h3>
      &nbsp;
    </Fragment>
  );
}

export default Orders;