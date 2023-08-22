import React, { Fragment, useState } from 'react';

const AddItem = () => {
  const [item_name, setItemName] = useState('');
  const [item_desc, setItemDesc] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model_number, setModelNumber] = useState('');
  const [stock_qty, setStockQty] = useState('');
  const [unit_price, setUnitPrice] = useState('');

  const createItem = async(e) => {
    e.preventDefault();
    try {
      const body = { item_name, item_desc, manufacturer, model_number, stock_qty, unit_price };
      const response = await fetch('http://localhost:5000/items',
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
      <button type='button' className='btn btn-warning' data-toggle='modal' data-target='#add-item-modal'>
        Add New Item
      </button>
      <div className='modal' id='add-item-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Create New Item</h4>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
            </div>
            <div className='modal-body'>
              <p>Item Name:</p>
              <input type='text' className='form-control' value={item_name} onChange={e => setItemName(e.target.value)} />
              <p>Item Description:</p>
              <input type='text' className='form-control' value={item_desc} onChange={e => setItemDesc(e.target.value)} />
              <p>Manufacturer:</p>
              <input type='text' className='form-control' value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
              <p>Model Number:</p>
              <input type='text' className='form-control' value={model_number} onChange={e => setModelNumber(e.target.value)} />
              <p>Stock Qty:</p>
              <input type='text' className='form-control' value={stock_qty} onChange={e => setStockQty(e.target.value)} />
              <p>Unit Price:</p>
              <input type='text' className='form-control' value={unit_price} onChange={e => setUnitPrice(e.target.value)} />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-success' data-dismiss='modal' onClick={e => createItem(e)}>Create Item</button>
              <button type='button' className='btn btn-danger' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddItem;