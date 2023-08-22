import React, { Fragment, useState } from "react";

const EditItem = ({ item }) => {
  const [item_name, setItemName] = useState(item.item_name);
  const [item_desc, setItemDesc] = useState(item.item_desc);
  const [manufacturer, setManufacturer] = useState(item.manufacturer);
  const [model_number, setModelNumber] = useState(item.model_number);
  const [stock_qty, setStockQty] = useState(item.stock_qty);
  const [unit_price, setUnitPrice] = useState(item.unit_price);

  const updateItem = async(e) => {
    e.preventDefault();
    try {
      const body = { item_name, item_desc, manufacturer, model_number, stock_qty, unit_price };
      const response = await fetch('http://localhost:5000/items/'+item.item_number,
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
      <button type='button' className='btn btn-warning' data-toggle='modal' data-target={'#id'+item.item_number}>
        Edit Item
      </button>
      <div className='modal' id={'id'+item.item_number}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Item</h4>
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
              <button type='button' className='btn btn-warning' data-dismiss='modal' onClick={e => updateItem(e)}>Submit Changes</button>
              <button type='button' className='btn btn-danger' data-dismiss='modal'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditItem;