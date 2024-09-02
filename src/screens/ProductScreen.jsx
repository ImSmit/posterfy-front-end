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
import { useGetProductQuery } from "../reducers/products/api";

export default function ProductScreen() {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const navigate = useNavigate()
    
    const {data, error,isError, isLoading} = useGetProductQuery(id)
    const product = isLoading ? null : isError ? null : data.data 
    
    const errorMessage = isError ? error.data.detail : null 
  
    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
    }
    
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