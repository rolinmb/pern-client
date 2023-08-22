import React, { Fragment, useEffect, useState } from 'react';
import EditOrder from './EditOrder';

const ListOrders = ({ psqlUser }) => {
  // eslint-disable-next-line
  const [username, setUsername] = useState(psqlUser.username);
  // eslint-disable-next-line
  const [adminStatus, setAdminStatus] = useState(psqlUser.is_admin);    
  const [orders, setOrders] = useState([]);

  const deleteOrder = async(id) => {
    try {
      const response = await fetch('http://localhost:5000/orders/'+String(id),
        {method: "DELETE"});
      setOrders(orders.filter(order => order.order_number !== id));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getAllOrders = async() => {
    try {
      const response = await fetch('http://localhost:5000/orderlist');
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getOrders = async() => {
    try {
      const body = { username };
      const response = await fetch('http://localhost:5000/orderlist', 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }
      );
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (adminStatus) {
      getAllOrders();
    } else {
      getOrders();
    }
  },[]);

  return (
    <Fragment>
      <div className='order-list-container list-container'>
        <table className='table mt-3 text-center order-table'>
          <thead>
            <tr>
              <th>Placed By</th>
              <th>Placed On</th>
              <th>Shipping Address</th>
              <th>Order Notes</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Tracking Number</th>
              <th>{psqlUser.is_admin ? 'Edit' : null}</th>
              <th>{psqlUser.is_admin ? 'Delete' : null}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_number}>
                <td>{order.placed_by || 'None'}</td>
                <td>{order.placed_on}</td>
                <td>{order.shipping_address || 'None'}</td>
                <td>{order.order_notes || 'None'}</td>
                <td>{order.payment_status || 'None'}</td>
                <td>{order.order_status || 'None'}</td>
                <td>{order.tracking_number || 'None'}</td>
                <td>{psqlUser.is_admin ? <EditOrder order={order} /> : null}</td>
                <td>
                  {psqlUser.is_admin ? 
                    <button className='btn btn-danger' onClick={() => deleteOrder(order.order_number)}>Delete</button>
                    : null
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListOrders;