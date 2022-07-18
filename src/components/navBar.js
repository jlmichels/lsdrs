import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ( { handleHome, handleDropoff, handleReception } ) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id="homeButton" href="" onClick={() => handleHome()}>LSDRS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleDropoff()}>Drop-off</Nav.Link>
            <Nav.Link onClick={() => handleReception()}>Reception</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;