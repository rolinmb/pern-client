import React, { Fragment, useState } from "react";

const AddOrder = ({ psqlUser }) => {
  const [username, setUsername] = useState(psqlUser.username);
  const [shipping_address, setShippingAddress] = useState('');
  const [order_notes, setOrderNotes] = useState('');
  const [payment_status, setPaymentStatus] = useState('');
  const [order_status, setOrderStatus] = useState('');
  const [tracking_number, setTrackingNumber] = useState('');

  const createOrder = async(e) => {
    e.preventDefault();
    try {
      const body = { username, shipping_address, order_notes, payment_status, order_status, tracking_number };
      const response = await fetch('http://localhost:5000/orders',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }
      );
      console.log(response);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <button type='button' className='btn btn-warning' data-toggle='modal' data-target='#new-order-modal'>
        New Order
      </button>
      <div className='modal' id='new-order-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Create New Order</h4>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
            </div>
            <div className='modal-body'>
            <p>Shipping Address:</p>
              <input type="text" className='form-control' value={shipping_address} onChange={e => setShippingAddress(e.target.value)} />
              <p>Order Notes:</p>
              <input type="text" className='form-control' value={order_notes} onChange={e => setOrderNotes(e.target.value)} />
              <p>Payment Status:</p>
              <input type="text" className='form-control' value={payment_status} onChange={e => setPaymentStatus(e.target.value)} />
              <p>Order Status:</p>
              <input type="text" className='form-control' value={order_status} onChange={e => setOrderStatus(e.target.value)} />
              <p>Tracking Number:</p>
              <input type="text" className='form-control' value={tracking_number} onChange={e => setTrackingNumber(e.target.value)} />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-success' data-dismiss='modal' onClick={e => createOrder(e)}>Submit New Order</button>
              <button type='button' className='btn btn-danger' data-dismiss='modal'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddOrder;