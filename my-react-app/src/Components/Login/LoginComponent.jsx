import React from 'react';
import './loginComponent.css';

const LoginComponent = () => {
  return (
    <div className='loginContainer'>
      <div className="header">
        <label className="text">Login</label>
      </div>
      <div className="inputs">
        <input type="text" placeholder='Name' />
        <input type="password" placeholder='Password' />
      </div>
      <div className="submitContainer">
        <button>Login</button>
      </div>
    </div>
  );
}

export default LoginComponent;
