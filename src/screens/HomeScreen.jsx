import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../reducers/products/productsSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

export default function HomeScreen() {
  const productListObj = useSelector(state => state.productList);
  
  const {isError, isLoading, products, errorMessage} = productListObj
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    }, [dispatch])

  return (
    <div>
      <h1>Home Screen</h1>
      {
          isLoading ? <Loader />
          : isError ? <Message variant={ "danger" } errorMessage={errorMessage}/>
          : <Row className="m-0">
          {
              products.map((product) => 
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} />
                  </Col>
              )
          }
        </Row>
      }
    </div>
  )
}
