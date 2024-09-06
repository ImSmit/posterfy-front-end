import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../reducers/cart/cartSlice"
import { Row, Col, ListGroup, Button, Image, Form, Card } from "react-bootstrap";
import { useSearchParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import { Link } from "react-router-dom";
import './screens.css'

export default function CartScreen() {
  let cartItems = []
  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get('qty')
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartItemsReducer = useSelector(state => state.cart);
  cartItems = cartItemsReducer.cartItems  
  
  useEffect(() => {
    if (id){
      async function getProduct(id){
        const response = await axios.get(`http://192.168.0.167:8000/api/products/${id}`)
        const prodData = {
          name: response.data.data.name, 
          image: response.data.data.image, 
          product: response.data.data._id, 
          price: response.data.data.price, 
          countInStock: response.data.data.countInStock,
          qty: quantity
        }
        dispatch(addToCart(prodData))
        // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        return response
      }
      getProduct(id)
    }else{
      console.log("ERROR :: no id");
    }
  }, [dispatch])

  const handleQtyChange = (item, q) => {    
    item = {...item, qty: q}
    dispatch(addToCart(item))    
  }

  const handleRemove = (id) => {        
    dispatch(removeFromCart(id))
  } 

  const handleProceed = () => {
    navigate(`/shipping`)
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
                      ${Number(item.price)}
                    </Col>
                    <Col md={3}>
                    <Form.Control 
                              as="select"
                              value={item.qty}
                              onChange={(e) => handleQtyChange(item, Number(e.target.value))}
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
      <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((curr, item) => curr + item.qty, 0 )}) items</h2>
                Price: { cartItems.reduce((curr, item) => curr + item.qty * Number(item.price), 0).toFixed(2) }
              </ListGroup.Item>
              
            </ListGroup>
            <ListGroup.Item className="proceed-area">
                <Button
                type="button"
                className="btn-block m-2"
                disabled= {cartItems.length > 0 ? false : true}
                onClick={handleProceed}>PROCEED TO CHECKOUT
                </Button>
              </ListGroup.Item>
          </Card>
      </Col>
    </Row>
  )
}


