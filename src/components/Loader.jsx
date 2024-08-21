import Spinner from 'react-bootstrap/Spinner';

export default  function Loader() {
  return (
    <div>
        <Spinner animation="grow" role="status" style={{
                                                        background:"#e95420",
                                                        margin:"auto",
                                                        display:"block"}}>
            <span className="visually-hidden" >Loading...</span>
        </Spinner>
    </div>
  )
}


