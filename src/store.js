import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import productsReducer from './reducers/products/productsSlice'
import productReducer from './reducers/products/productSlice'
import cartReducer from './reducers/cart/cartSlice'
import userSlice from './reducers/users/userSlice'
import { productsAPI } from './reducers/products/api' 
import { usersAPI } from './reducers/users/api'

export const store = configureStore({
  reducer: {
    productList: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userSlice,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  }, 

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware, usersAPI.middleware)
})

setupListeners(store.dispatch)

