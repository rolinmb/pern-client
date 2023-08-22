import React, { Fragment, useEffect, useState } from 'react';
import EditItem from './EditItem';

const ListItems = ({ psqlUser }) => {
  const [items, setItems] = useState([]);

  const deleteItem = async(num) => {
    try {
      const response = await fetch('http://localhost:5000/items/'+String(num),
        {method: 'DELETE'});
      setItems(items.filter(item => item.item_number !== num));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getItems = async() => {
    try {
      const response = await fetch('http://localhost:5000/items');
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Fragment>
      <div className='list-container'>
        <table className='table mt-5 text-center'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Manufacturer</th>
              <th>Model Number</th>
              <th>Stock Qty</th>
              <th>Unit Price</th>
              <th>{ psqlUser.is_admin ? 'Edit' : null }</th>
              <th>{ psqlUser.is_admin ? 'Delete' : null }</th>
            </tr>
          </thead>
          <tbody>
          {items.map(item => (
            <tr key={item.item_number}>
              <td>{item.item_name}</td>
              <td>{item.item_desc}</td>
              <td>{item.manufacturer}</td>
              <td>{item.model_number}</td>
              <td>{item.stock_qty}</td>
              <td>{item.unit_price}</td>
              <td>{psqlUser.is_admin ? <EditItem item={item} /> : null}</td>
              <td>
                {psqlUser.is_admin ?
                <button className='btn btn-danger' onClick={() => deleteItem(item.item_number)}>Delete Item</button>
                : null}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListItems;