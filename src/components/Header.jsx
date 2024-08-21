
import { Navbar, Container, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
export default function Header() {
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
            <LinkContainer to="/login" >
              <Nav.Link><i className="fa fa-user p-2"/>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
    
  )
}


