import React,{useContext} from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

import {CartContext} from '../../providers/cart/cart.provider';

import './checkout.scss';

const CheckoutPage = () => {
  const {cartItems,cartTotal} = useContext(CartContext);

return(
  <div className='checkout-page'>
    <div className='checkout-header'>

      <div className='header-block'>
        <span>Product</span>
     </div>

     <div className='header-block'>
        <span>Description</span>
     </div>

     <div className='header-block'>
        <span>Quantity</span>
     </div>

     <div className='header-block'>
        <span>Price</span>
     </div>

     <div className='header-block'>
        <span>Remove</span>
     </div>
    </div>
    {
      cartItems.map(cartItem =>
         <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      )
    }{/*we pass quantity here because we want update it every time quantity change
    so we have here in this file selectCartItems that give us the new state everytime quantity change*/}
    <div className='total'>
      <span>TOTAL: ${cartTotal}</span>
    </div>
    <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 08/20 - CVV: 123
    </div>
    <StripeCheckoutButton price={cartTotal} />
  </div>
);
}

export default CheckoutPage;