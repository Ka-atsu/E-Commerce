import React from 'react';
import { Link , useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './dashboardComponent.css';

const SidebarComponent = () => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard'); 
        window.location.reload(); 
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); 
        navigate("/"); 
    };

    return (
        <div className='sidebar'>
            <h1>Site Name</h1>
            <ul>
                <li>
                    <Link onClick={handleDashboardClick}>Dashboard</Link>
                </li>
                <li>
                    <button class="customButton" onClick={handleLogout}>Sign Out</button>
                </li>
            </ul>
        </div>
    );
}

export default SidebarComponent;

