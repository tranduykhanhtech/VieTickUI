import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"


export const Header = () => {
  return (
    <Navbar expand="lg" className='w-100 bg-white'>
      <Container fluid className='d-flex align-items-center justify-content-between'>
        <Navbar.Brand className='fw-bold'>
          VieTick
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='d-flex justify-content-start'>
          <Nav.Link as={Link} to="/" className='me-3'>Products</Nav.Link>
          <Nav.Link as={Link} to="/" className='me-3'>Resoures</Nav.Link>
          <Nav.Link as={Link} to="/" className='me-3'>Plan</Nav.Link>
        </Navbar.Collapse>
        <Button className='btn border-0 bg-white text-dark'>Log in</Button>
        <Button 
          className='btn border-0 bg-priamry'
          style={{
            background: "linear-gradient(to right, #7A56F2, #47318C)",
            borderRadius: "15px"
          }}
        >
          Install now
        </Button>
      </Container>
    </Navbar>
  )
}
