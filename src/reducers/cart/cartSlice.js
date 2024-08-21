import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cartItems: cartItemsFromStorage,
} 
const cartSlice = createSlice({
    name:'cardItems',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
            const item = action.payload;            
            const existsItem = state.cartItems.find(x => x.product === item.product)
            if (existsItem) {
                // update value in cart
                state.cartItems = state.cartItems.map(x => 
                        x.product === existsItem.product ? item : x
                    )
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

            }else{
                // if not exists then insert item in cart 
                state.cartItems.push(item)
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            }
            
        }, removeFromCart: (state, action) => { 
            state.cartItems = state.cartItems.filter((i) => i.product != action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;