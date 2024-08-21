import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../reducers/cart/cartSlice"
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import Message from '../components/Message'
import { Link } from "react-router-dom";

export default function CartScreen() {
  let cartItems = []
  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get('qty')
  
  const dispatch = useDispatch();
  const cartItemsReducer = useSelector(state => state.cart);
  cartItems = cartItemsReducer.cartItems
  console.log("cart Items", cartItems.length);
  
  
  useEffect(() => {
    if (id){
      async function getProduct(id){
        const response = await axios.get(`http://192.168.0.167:8000/api/product/${id}`)
        const prodData = {
          name: response.data.data.name, 
          image: response.data.data.image, 
          product: response.data.data._id, 
          price: response.data.data.price, 
          countInStock: response.data.data.countInStock,
          qty: quantity
        }
        console.log(prodData);
        dispatch(addToCart(prodData))
        // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        return response
      }
      getProduct(id)
    }else{
      console.log("no id");
    }
  }, [dispatch])

  const handleQtyChange = (item, q) => {
    item = {...item, qty: q}
    dispatch(addToCart(item))    
  }

  const handleRemove = (id) => {        
    dispatch(removeFromCart(id))
  } 

  return (
    <Row>
      <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0? 
            <Message variant="info" errorMessage="Your Cart is Empty" />:
            <ListGroup variant="flush">
              {cartItems.map((item) => 
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                    <Form.Control 
                              as="select"
                              value={item.qty}
                              onChange={(e) => handleQtyChange(item, e.target.value)}
                              >
                                {
                                  [...Array(item.countInStock).keys()].map((x) => (
                                    <option value={x + 1} key={x+1}> {x + 1} </option>
                                  ))
                                }
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button type="button" variant="light" onClick={() => handleRemove(item.product)}><i className="fas fa-trash"></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          }
      </Col>
      <Col></Col>
    </Row>
  )
}


