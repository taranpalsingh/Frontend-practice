import React from 'react';
import './Book.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Book = (props) => {

    const dispatch = useDispatch();
    const {id, name, price} = props.item;

    const addToCart = () => {
        console.log(id, price, name)
        dispatch(cartActions.addItemToCart({
            id,
            price,
            name,
        }))
    }

    return (
        <div className='book'>
            <div className='first-row'>
                <h2 className='title'>{props.item.name}</h2>
                <div className='price'>${Number(props.item.price).toFixed(2)}</div>
            </div>
            <div className='subtitle'>{props.item.description}</div>
            <div className='footer'>
                <button className='btn' onClick={() => addToCart()}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Book;