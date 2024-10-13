import React from 'react';
import { Link } from 'react-router-dom';
import './dashboardComponent.css';

const SidebarComponent = () => {
    return (
        <div className='sidebar'>
            <h1>Site Name</h1>
            <ul>
                <li>
                    <Link to="/editProduct">Edit Product</Link>
                </li>
                <li>
                    <Link to="/deleteProduct">Delete Product</Link>
                </li>
                <li>
                    <Link to="/viewProduct">View Product</Link>
                </li>
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarComponent;

