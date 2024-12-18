import "./index.css"
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from "./screens/CartScreen.jsx"
import LoginScreen from "./screens/LoginScreen.jsx"

import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from "./store.js"
import RegisterScreen from "./screens/RegisterScreen.jsx"
import ProfileScreen from "./screens/ProfileScreen.jsx"
import ShippingScreen from "./screens/ShippingScreen.jsx"

const router = createBrowserRouter([
  {
    path: "/", 
    element:<App />,
    errorElement:<h1>Sorry You lost your way</h1>,
    children: [
      {path:"/", element:<HomeScreen />},
      {path:"/product/:id", element:<ProductScreen />},
      {path:"/cart/:id?", element:<CartScreen />}, // ? : means id is optional
      {path:"/login", element:<LoginScreen />},
      {path:"/register", element:<RegisterScreen />},
      {path:"/profile", element:<ProfileScreen />},
      {path:"/shipping", element:<ShippingScreen />},
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
