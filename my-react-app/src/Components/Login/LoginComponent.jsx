import React, { useState } from 'react';
import './loginComponent.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and sign-up
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        // Registration logic
        await axios.post('http://localhost:8000/api/register', {
          name,
          email,
          contact,
          password,
        });
        alert('Registration successful! You can now log in.');
        setIsRegistering(false);
      } else {
        // Login logic
        const response = await axios.post('http://localhost:8000/api/login', {
          name,
          password,
        });

        const { user } = response.data;

        // Store user information in localStorage
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userRole', user.role); // Save the role for navigation

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/productlist');
        }
      }
    } catch (error) {
      setError(isRegistering ? 'Registration failed' : 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="header text-center mb-5">
        <h2>{isRegistering ? 'Sign Up' : 'Login'}</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        {isRegistering && (
          <>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContact" className="mb-3">
              <Form.Label>Contact Info</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact information"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-grid mb-3">
          <Button variant="info" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{' '}
                {isRegistering ? 'Signing Up...' : 'Logging in...'}
              </>
            ) : isRegistering ? 'Sign Up' : 'Login'}
          </Button>
        </div>
      </Form>

      {error && <p className="error-message text-danger">{error}</p>}

      <div className="text-center mt-3">
        <Button
          variant="link"
          onClick={() => setIsRegistering((prev) => !prev)}
          disabled={loading}
        >
          {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
