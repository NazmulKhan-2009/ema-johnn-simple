import React from 'react';

const Cart = (props) => {
  // console.log(props.cart);

  const cart=props.cart
// way => 1
//  const total=cart.reduce((total,prd)=>total+prd.price,0)

// way =>2
let total=0
for(let i=0;i<cart.length;i++){
  const pp=cart[i]
  total=pp.price+total
}

let shippingCost=0
if(total>35){
  shippingCost=0
}else if(total>15){
    shippingCost=4.99
}else if(total>0){
    shippingCost=0
}

const formatNumber=number=>{
  const fixedDigit=number.toFixed(2)
  return Number(fixedDigit)
}



const tax=(total/10).toFixed(2)

const tValue=(total+shippingCost+Number(tax)).toFixed(2)

  return (
    <div>
      <h4>Order Summery</h4>
      <p>Items Ordered : {cart.length}</p>
      <p>Total price : {formatNumber(total)}</p>
      <p>Shipping Cost : {shippingCost}</p>
      <p>Tax+vat : {tax}</p>
      <p>Total Cost : {tValue}</p>
    </div>
  );
};

export default Cart;