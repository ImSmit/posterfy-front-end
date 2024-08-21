import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap";
import "./bootstrap.min.css"
import "./index.css"

export default function App() {

  return (
    <>
      <Header />
      <Container>
      <Outlet />
      </Container>
      <Footer />
    </>
      
  )
}
