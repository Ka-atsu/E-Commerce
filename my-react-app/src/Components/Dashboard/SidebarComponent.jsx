import React from 'react';
import { Link , useNavigate  } from 'react-router-dom';
import './dashboardComponent.css';

const SidebarComponent = () => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/'); // Navigate to the dashboard
        window.location.reload(); // Refresh the page
    };

    return (
        <div className='sidebar'>
            <h1>Site Name</h1>
            <ul>
                <li>
                    <Link to="/" onClick={handleDashboardClick}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarComponent;

