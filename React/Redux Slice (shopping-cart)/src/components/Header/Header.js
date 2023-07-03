import React from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import uiSlice, { uiActions } from '../../store/ui-slice';

function Header (props) {

    const dispatch = useDispatch();
    const cartQuantity = useSelector(state => state.cart.totalQuantity);

    const cartToggle = () => {
        dispatch(uiActions.toggle());
    }

    return (
        <div className='header'>
            <h2 className='logo'>ReduxCart</h2>
            {/* {props.showCart? ( */}
                <div className='my-cart' onClick={() => cartToggle()}>
                    <p>My Cart</p>
                    <div className='cart-count'>{cartQuantity}</div>
                </div>
                {/* ) : null} */}
        </div>
    )
}

export default Header;