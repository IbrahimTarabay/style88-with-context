import React,{useContext} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
 
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import CartContext from '../../contexts/cart/cart.context';
 
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
 /*This is a new special syntax when importing SVG in React.
 The ReactComponent import name is special and tells Create React App
 that you want a React component that renders an SVG, rather than its filename.*/
import './cart-icon.scss';

const CartIcon = ({itemCount}) =>{
  const {toggleHidden} = useContext(CartContext);
    return(
    <div className='cart-icon' onClick={toggleHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
    )};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

export default connect(mapStateToProps)(CartIcon);