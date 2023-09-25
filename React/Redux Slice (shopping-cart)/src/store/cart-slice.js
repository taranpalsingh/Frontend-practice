import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0},
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            state.totalQuantity++;

            const item = action.payload;
            const existingItem = state.items.find(ele => item.id === ele.itemId);

            if (!existingItem) {
                state.items.push({
                    itemId: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.name
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += item.price;
            }
        },
        removeItemFromCart(state, action) {
            state.totalQuantity--;

            const id = action.payload.id;
            const existingItem = state.items.find(item => id === item.itemId);
            
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.itemId != id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;