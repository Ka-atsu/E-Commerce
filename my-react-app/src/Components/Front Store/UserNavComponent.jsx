import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const UserNavComponent = ({ handleSearch, cartCount }) => {
  return (
    <Navbar bg="transparent" expand="lg" className="mb-4">
      <Container className="d-flex align-items-center justify-content-between mt-3">
        {/* Shop Name */}
        <Navbar.Brand as={Link} to="/productlist" className="me-auto">
          <strong>My Shop</strong>
        </Navbar.Brand>
        
        {/* Search Bar */}
        <Form className="d-flex mx-auto" style={{ flexGrow: 1, maxWidth: '600px' }}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            style={{ width: '100%', height: '38px', fontSize: '1rem' }}
            onChange={handleSearch} // Handle search input here
          />
        </Form>
        
        {/* Cart Link */}
        <Link to="/cart" className="btn btn-outline-dark btn-sm ms-auto">
          Cart {cartCount > 0 && <span className="badge bg-danger ms-2">{cartCount}</span>}
        </Link>
      </Container>
    </Navbar>
  );
};

export default UserNavComponent;
