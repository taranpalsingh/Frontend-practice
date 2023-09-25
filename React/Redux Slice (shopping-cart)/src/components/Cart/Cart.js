import React from 'react';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import cartSlice, { cartActions } from '../../store/cart-slice';

function Cart (props) {

    const dispatch = useDispatch();
    const data = useSelector(state => state.cart.items);
    // let data = [
    //     {
    //         itemId: 1,
    //         price: 6,
    //         quantity: 1,
    //         totalPrice: 6,
    //         name: 'My First Book'
    //     }
    // ];

    const increaseQuantity = (item) => {
        dispatch(cartActions.addItemToCart({
            id: item.itemId, 
            price: item.price, 
            name: item.name
        }))
    }

    const decreaseQuantity = (item) => {
        dispatch(cartActions.removeItemFromCart({
            id: item.itemId, 
            price: item.price, 
            name: item.name
        }))
    }

    React.useEffect(() => {
        // data = localStorage.getItem('cart')
    }, [])

    return (
        <div className='cart'>
            <h2 className='title'>Your Shopping Cart</h2>
            {data.map(item => {
                return (
                    <div className='item'>
                        <div className='row'>
                            <p>{item.name}</p>
                            <p>${item.totalPrice} / (${item.price} ea)</p>
                        </div>
                        <div className='row2'>
                            <button onClick={() => decreaseQuantity(item)}>-</button>
                            <button onClick={() => increaseQuantity(item)}>+</button>
                        </div>
                    </div>
                )
            })}
            {/* <div className='first-row'>
                <h2 className='title'>{props.item.name}</h2>
                <div className='price'>${Number(props.item.price).toFixed(2)}</div>
            </div>
            <div className='subtitle'>{props.item.description}</div>
            <div className='footer'>
                <button className='btn'>Add to Cart</button>
            </div> */}
        </div>
    )
}

export default Cart;