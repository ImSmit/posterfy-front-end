/* eslint-disable no-unused-vars */
// import products from "../products"
import Rating from "../components/Rating"
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { fetchProduct } from "../reducers/products/productSlice"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";

export default function ProductScreen() {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const navigate = useNavigate()
    const productObj = useSelector(state => state.product);
    console.log("productObj ::", productObj);
    
    const {isError, isLoading, product, errorMessage} = productObj
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProduct(id))
    }, [dispatch])
    
    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
    }
    // const product = products.find((p) => p._id == id)
    // console.log(product);
    
    return (
      <>
        {
          isLoading ? <Loader />
          : isError ? <Message variant={ "danger" } errorMessage={errorMessage}/>
          : <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.image} fluid/>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} color={"#f8e825"} text={product.numOfReviws} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                          <Col>Status: </Col>
                          {product.countInStock > 0 ?<Col>In Stock</Col>: <Col>Out of stock</Col>}
                          
                      </Row>
                    </ListGroup.Item>
                    { product.countInStock > 0? 
                    <ListGroup.Item>
                      <Row>
                          <Col>Qty: </Col>
                          <Col>
                              <Form.Control 
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              >
                                {
                                  [...Array(product.countInStock).keys()].map((x) => (
                                    <option value={x + 1} key={x+1}> {x + 1} </option>
                                  ))
                                }
                              </Form.Control>
                          </Col>
                      </Row>
                    </ListGroup.Item>
                    : null}
                    <ListGroup.Item>
                      <Row className="p-2">
                        <Button className="btn-block" 
                                disabled={product.countInStock == 0} 
                                style={{borderRadius:'0px'}} 
                                type="button"
                                onClick={addToCartHandler}
                                >Add to Cart</Button>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
        </div>
        }
        
      </>
    )
}