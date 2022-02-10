import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
import { logout } from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // function for logout
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Home Decor</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {/* dwaq */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <BiLogInCircle />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* wer */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
