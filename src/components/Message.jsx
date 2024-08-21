import Alert from 'react-bootstrap/Alert';

export default function Message({variant, errorMessage}) {
  return (
    <div>
      <Alert key={variant} variant={variant}>
          {errorMessage}
        </Alert>
    </div>
  )
}


