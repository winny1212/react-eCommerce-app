import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Home Decor</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart />
                Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <BiLogInCircle />
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
