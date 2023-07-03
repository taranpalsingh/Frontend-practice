import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from './store/cart-slice';

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  
  const getCart = async () => {
    const response = await fetch('https://react-redux-79b06-default-rtdb.firebaseio.com/cart.json');
      if (!response.ok) {
          throw new Error('could not fetch')
      }
      const data = await response.json();
      return data;
  }
  
  const replaceCart = async () => {
    try {
      const data = await getCart();
      debugger
      dispatch(cartActions.replaceCart({items: data.items, totalQuantity: data.totalQuantity}));
    } catch (error) {
      throw new Error('could not fetch cart');
    }
  }

  useEffect(() => {
    replaceCart();
    isInitial = false;
  }, []);

  
  const sendCartData = async () => {
    const response = await fetch(
      'https://react-redux-79b06-default-rtdb.firebaseio.com/cart.json', 
      {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

    if (!response.ok) {
        throw new Error('could not fetch')
    }
    const data = await response.json();
    return data;
  }
  
  const sendData = async () => {
    try {
      const data = await sendCartData();
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (isInitial)
      return;
    sendData();
  }, [cart]);

  return (
    <div className='App'>
      <Header showCart={showCart}/>
      <Content />
    </div>
  );
}

export default App;
