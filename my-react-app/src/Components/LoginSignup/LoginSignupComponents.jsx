import React, { useState } from 'react';
import './LoginSignup.css'

const LoginSignupComponents = ({ name }) => {
    const [action, setAction] = useState("Login");
return <div className='container'>
    <div className="header">
        <label className="text">{action}</label>
    </div>
    <div className="inputs">
        <input type="text" placeholder='Name'/>
        <input type="password" placeholder='Password'/>
        {action==="Login"?<div />: <input type="password" placeholder='Confirm Password'/>}
    </div>
    <div className="submit-container">
        <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Signup")}}>Signup</button>
        <button className={action==="Signup"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</button>
    </div>
    </div>;
}
export default LoginSignupComponents;