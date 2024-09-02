
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { logOut } from "../reducers/users/userSlice"

export default function Header() {
  const userObj = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { userInfo } = userObj
  console.log(userInfo);
  
  const logoutHandler = () => {
    dispatch(logOut())
  }

  return (
  <header>
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">PosterFy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/cart" >
              <Nav.Link><i className="fas fa-shopping-cart p-2"/>Cart</Nav.Link>
            </LinkContainer>
            { userInfo ? 

            <NavDropdown title={userInfo.name} id="username" className="py-1">
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
              </NavDropdown.Item>
            </ NavDropdown>
            : <LinkContainer to="/login" >
                <Nav.Link><i className="fa fa-user p-2"/>Login</Nav.Link>
              </LinkContainer>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
    
  )
}


