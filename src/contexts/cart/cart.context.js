import {createContext} from 'react';

const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {}
  /*if there's no new invoked function with toggleHidden we want'
  to have empty function to not throw an error*/
});

export default CartContext;