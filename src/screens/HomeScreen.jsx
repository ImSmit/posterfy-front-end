import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../reducers/products/productsSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useGetProductsQuery } from "../reducers/products/api"

export default function HomeScreen() {
  const { data, error, isError, isLoading } = useGetProductsQuery()
  const errorMessage = isError? error.data.detail: null
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    }, [dispatch])

  return (
    <div>
      <h1>Home Screen</h1>
      {
          isLoading ? <Loader />
          : error ? <Message variant={ "danger" } errorMessage={errorMessage}/>
          : <Row className="m-0">
          {
              data.map((product) => 
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
