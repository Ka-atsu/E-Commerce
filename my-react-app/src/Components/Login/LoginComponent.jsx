import React, { useState } from 'react';
import './loginComponent.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    setError(''); // Clear any previous errors

    try {
      await axios.post('http://localhost:8000/api/login', {
        name, 
        password,
      });
      localStorage.setItem('isAuthenticated', true);
      navigate("/dashboard");
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setLoading(false); // Stop loading after the request is done
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
            <Form.Label>Username</Form.Label> 
            <Form.Control type="text" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </Form>
        {error && <p className="error-message text-danger">{error}</p>} 
      </div>
    </>
  );
};

export default LoginComponent;
