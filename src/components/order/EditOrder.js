import React, { Fragment, useState } from 'react';

const EditOrder = ({ order }) => {
  // eslint-disable-next-line
  const [order_number, setOrderNumber] = useState(order.order_number);
  const [shipping_address, setShippingAddress] = useState(order.shipping_address);
  const [order_notes, setOrderNotes] = useState(order.order_notes);
  const [payment_status, setPaymentStatus] = useState(order.payment_status);
  const [order_status, setOrderStatus] = useState(order.order_status);
  const [tracking_number, setTrackingNumber] = useState(order.tracking_number);

  const updateOrder = async(e) => {
    e.preventDefault();
    try {
      const body = { shipping_address, order_notes, payment_status, order_status, tracking_number };
      const response = await fetch('http://localhost:5000/orders/'+order_number,
        {
            method: 'PUT',
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
      <button type='button' className='btn btn-warning' data-toggle='modal' data-target={'#id'+order_number}>
        Edit Order
      </button>
      <div className='modal' id={'id'+order_number}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Order</h4>
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
              <button type='button' className='btn btn-warning' data-dismiss='modal' onClick={e => updateOrder(e)}>Submit Changes</button>
              <button type='button' className='btn btn-danger' data-dismiss='modal'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditOrder;