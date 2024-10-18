import React, { useState } from 'react';
import './loginComponent.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/login', {
            name, 
            password,
        });
        localStorage.setItem('isAuthenticated', true);
        navigate("/dashboard");
    } catch (error) {
        setError('Invalid username or password');
    }
  };

  return (
    <>
      <div className='loginContainer'>
        <div className="header text-center mb-5">
          <h2>Login</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label> 
            <Form.Control type="text" placeholder="Enter your email" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">Login</Button>
          </div>
        </Form>
        {error && <p className="error-message text-danger">{error}</p>} 
      </div>
    </>
  );
}

export default LoginComponent;
