import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FromContainer'
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useUserLoginAPIMutation } from '../reducers/users/api'
import { loginSuccess } from '../reducers/users/userSlice'

export default function LoginScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)

    const [userLoginAPI, {isLoading, error, isError}] = useUserLoginAPIMutation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ searchParams ] = useSearchParams()

    const errorMessage = isError ? error.data.detail : null
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : "/"

    useEffect(() => {      
        if(userInfo.isLoggedIn){
            navigate(redirect)
        }
    }, [redirect, userInfo, history])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await userLoginAPI({username:email, password}).unwrap()        
        dispatch(loginSuccess(result))
    }

    return (
        <>
        {
            isLoading ? <Loader /> :  
            <FromContainer >
                <h1>Sign in</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? 
                    <Link to={redirect? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
            {isError && <Message variant={ "danger" } errorMessage={errorMessage} />}
            </FromContainer>
        }
        </>
    )
}
