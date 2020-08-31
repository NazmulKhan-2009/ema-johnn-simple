import React from 'react';

const Reviewitem = (props) => {
  const {name,img,seller,price,stock,key,quantity}=props.product
  const reviewItemStyle={
    borderBottom:"1px solid lightgray",
    marginBottom:"5px",
    paddingBottom:"5px",
    marginLeft:"200px"

  }
  return (
    <div style={reviewItemStyle}>
      <h4 className="product-name">{name}</h4>   
      <p>Quantity: {quantity}</p>
      <p><small>$ {price}</small></p>
      <button className="main-button" onClick={props.removeItem.bind(this, key)}>Remove</button>
    </div>
  );
};

export default Reviewitem;