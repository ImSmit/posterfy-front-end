import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FromContainer'
import { useSearchParams } from 'react-router-dom';

export default function ShippingScreen() {
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")

  const submitHandler = () => {
    console.log("form group");  
  }

  return (
      <FromContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>
              Address
            </Form.Label>
            <Form.Control
                required
                type='address'
                placeholder='Enter your address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                req
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              City
            </Form.Label>
            <Form.Control
                required
                type='city'
                placeholder='Enter your city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                req
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Postal Code
            </Form.Label>
            <Form.Control
                required
                type='postalcode'
                placeholder='Enter your postalcode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                req
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Country
            </Form.Label>
            <Form.Control
                required
                type='country'
                placeholder='Enter your country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                req
            ></Form.Control>
          </Form.Group>
        </Form>
        
      </FromContainer>
  )
}
