import React, { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Reviewitem from '../Reviewitem.js/Reviewitem';
import Cart from '../Cart/Cart';
import happyImage from "../../images/giphy.gif"
import { useHistory } from 'react-router-dom';
const Review = () => {
  
const [cart, setCart]=useState([])
const[orderPlaced, setOrderPlaced]=useState(false)
const history=useHistory()
  useEffect(()=>{
    // console.log( getDatabaseCart()) 
    const saveCart=getDatabaseCart()
    const productkeys=Object.keys(saveCart)
    // const counts=productkeys.map(key=> saveCart[key] )
    // console.log(productkeys)
    // console.log( saveCart)

  //  const cartProducts =productkeys.map(key=>
  //    fakeData.find(pd=>pd.key===key))
    // console.log(cartPro);

   const cartProducts= productkeys.map(key=>{
     const product=fakeData.find(pd=>pd.key===key);
     product.quantity=saveCart[key]
     return product 
 })
   console.log(cartProducts);
  setCart(cartProducts)
  
    
  },[])

  let thankyou;
  if(orderPlaced){
      thankyou=<img src={happyImage} alt=""/>
  }
  

  const removeProduct=(productKey)=>{
    // console.log( remove)

    const newCart=cart.filter(v=>v.key !== productKey)
    setCart(newCart)

    removeFromDatabaseCart(productKey)
    
  }

  const handleProceedCheckout=()=>{
    history.push('/shipment');
    
    
  }
  return (
    <div className="twin-container">
    
    <div className="product-container">
    {thankyou}
    {/* {orderPlaced} */}
    {
        cart.map(pd=><Reviewitem product={pd}
        key={pd.key}
        removeItem={removeProduct}
        ></Reviewitem>)
      }
    </div>

    <div className="cart-container">
      <Cart cart={cart}>
      <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
      </Cart>
    </div>
      
     
    </div>
  );
};

export default Review;