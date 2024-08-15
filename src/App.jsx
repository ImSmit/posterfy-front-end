import { Container } from "react-bootstrap";

import Footer from "./components/Footer";
import Header from "./components/Header";
import "./bootstrap.min.css"
import "./index.css"
export default function App() {

  return (
    <>
    <Header />
    <main className="py-3"><h1>Welcome</h1></main>
    <Footer />
    </>
      
  )
}
