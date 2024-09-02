import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useUserGetAPIMutation, useUserUpdateAPIMutation } from '../reducers/users/api'
import { getUser } from '../reducers/users/userSlice'
import Message from '../components/Message'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ProfileScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const userObj = useSelector(state => state.user)
  const { userInfo, userDetail } = userObj

  const [userGetAPI] = useUserGetAPIMutation()
  const [userUpdateAPI, { isError, isLoading, error }] = useUserUpdateAPIMutation()
  const errorMessage = isError && error
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userInfo) {
        navigate('/login')
      } else {
        if (!userDetail || !userDetail.name) {
          const result = await userGetAPI({ id: 'profile', token: userInfo.token })
          dispatch(getUser(result))          
        } else {
          setName(userDetail.name)
          setEmail(userDetail.email)
          setPassword("")
          setConfirmPassword("")
        }
      }
    }
    fetchProfile()

  }, [userInfo, userDetail])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(password);
    console.log(password);
    
    if (password !== confirmPassword) {
      setMessage("Password do not match")
    } else {
      const cred = {
        first_name: name,
        email: email,
        password: password
      }

      const res = await userUpdateAPI({ credentials: cred, token: userInfo.token })
      if (res){
        console.log("result = ", res);
        dispatch(getUser(res))
      }
      setMessage("")
      toast.success("Updated", {
        position: "top-right"
      });

    }
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col className="md-12">
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='py-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                req
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='py-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='py-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm' className='py-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Enter Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {isError ?
              <Form.Group controlId='message' className='py-2'>
                <Message className="py-3" variant={"danger"} errorMessage={errorMessage} />
              </Form.Group> :
              message && <Form.Group controlId='message' className='py-2'>
                <Message className="py-3" variant={"danger"} errorMessage={message} />
              </Form.Group>}

            <Button type='submit' variant='primary'>Register</Button>
          </Form>
        </Col>
        <Col className="md-12">
          <h2>My Orders</h2>
        </Col>
      </Row>
    </Container>
  )
}



