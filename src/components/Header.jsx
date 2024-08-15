
import { Navbar, Container, Nav } from "react-bootstrap"

export default function Header() {
  return (
    
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">PosterFy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/car"><i className="fas fa-shopping-cart" />Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fa fa-user" />Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
    
  )
}


