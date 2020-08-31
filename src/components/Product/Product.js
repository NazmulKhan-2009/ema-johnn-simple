import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
// console.log(props);
// console.log(props.product)
  const {name,img,seller,price,stock,key}=props.product
// console.log(props)
  return (
    <div className="product">
      <div>
        <img src={img} alt=""/>
      </div>

      <div>
        <h4 className="product-name"><Link to={`/product/${key}`}> {name} </Link>  </h4>
        <br/>
        <p><small> By : {seller}</small></p>
        <p>${price}</p>
        <br/>
        <p><small>Only {stock} left in Stock, Order Soon</small></p>

        {props.showAddTocart && <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}>
        <FontAwesomeIcon icon={faShoppingCart}/> 
        Add to Cart</button>

        }
        
      </div>
      
    </div>
  );
};

export default Product; 