import React from 'react';
import { Link } from 'react-router-dom'; 
import './dashboardComponent.css';

const TopbarComponent = () => {
    return (
        <header className='navTop'>
            <Link to="/addProduct" className="addProductButton">
                + ADD PRODUCT
            </Link>
        </header>
    );
}

export default TopbarComponent;
