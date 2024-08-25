import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FromContainer'
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userRegisterAPI } from '../reducers/users/userSlice'

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const [ searchParams ] = useSearchParams()
    
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : "/"
    const userInfo = useSelector(state => state.userLogin)
    
    const {isLoggedIn, isLoading, isError, product_data, errorMessage} = userInfo
    
    useEffect(() => {      
        if(userInfo.isLoggedIn){
            navigate(redirect)
        }
    }, [redirect, userInfo, history])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword){
            setMessage("Password do not match")
        }else{
            dispatch(userRegisterAPI({name, email, password}))
        }
    }

    return (
            <FromContainer >
                <h1>Register</h1>
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

                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            {message && <Form.Group controlId='message' className='py-2'>
                        <Message className="py-3" variant={ "danger" } errorMessage={message} />
                        </Form.Group>}
            <Row className='py-1'>
                <Col>
                    Have an account? 
                    <Link to={redirect? `/login?redirect=${redirect}` : '/login'}> Sign In</Link>
                </Col>
            </Row>
        </FromContainer>
    )
}
