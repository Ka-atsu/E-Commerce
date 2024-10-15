import React from 'react';
import './loginComponent.css';
import { Form, Button } from 'react-bootstrap';

const LoginComponent = () => {
  return (
    <>
    <div className='loginContainer'>
      <div className="header text-center mb-5">
            <h2>Login</h2>
      </div>
      <Form>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" />
        </Form.Group>

        <div className="d-grid mb-3">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
    </>
  );
}

export default LoginComponent;
