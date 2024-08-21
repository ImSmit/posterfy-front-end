import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/products/productsSlice'
import productReducer from './reducers/products/productSlice'
import cartReducer from './reducers/cart/cartSlice'

export const store = configureStore({
  reducer: {
    productList: productsReducer,
    product: productReducer,
    cart: cartReducer,
  }
})