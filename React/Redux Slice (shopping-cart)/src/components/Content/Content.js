import React, { useEffect } from 'react';
import './Content.css';
import Book from '../Book/Book';
import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';

function Content () {

    const showCart = useSelector(state => state.ui.cartIsVisible);
    const data = [
        {
            id: 1,
            name: 'My first book',
            price: 6,
            description: 'first one i ever wrote',
        },
        
        {
            id: 2,
            name: 'My 2nd book',
            price: 4,
            description: 'first one i ever wrote first one i ever wrote',
        },
        
        // {
        //     id: 3,
        //     name: 'My third book',
        //     price: 5,
        //     description: 'first one i ever wrote',
        // }
    ];

    // useEffect(() => {
    //     const data = localStorage.getItem('cart', )

    // }, [])

    // const getData = () => {
    //     localStorage.getItem('cart', )
    // }
    // const async setData = () => {
    //     const response = await fetch('https://react-redux-79b06-default-rtdb.firebaseio.com/cart.json');

    //     if (!response.ok) {
    //         throw new Error('could not fetch')
    //     }
    //     const data = await response.json();
    //     return data;
    // }

    return (
        <div className='content'>
            {showCart && <Cart />}
            <div className='title'>Buy your favourite products</div>
            {data.map(item => <Book item={item}/>)}
        </div>
    )
}

export default Content;