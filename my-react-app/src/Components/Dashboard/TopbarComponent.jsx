import React, { useState, useEffect } from 'react';
import './dashboardComponent.css';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';

const TopbarComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation(); // Get the current location
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);

    useEffect(() => {
        // Disable search if the current route is /dashboard
        if (location.pathname === '/dashboard') {
            setIsSearchDisabled(false);
        } else {
            setIsSearchDisabled(true);
        }
    }, [location.pathname]); // Re-run the effect when the route changes

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <header className='navTop'>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-1"
                    value={searchTerm}
                    onChange={handleSearch}
                    disabled={isSearchDisabled} 
                />
                
            </Form>
            <Link to="/addProduct" className="btn btn-dark">+ ADD PRODUCT</Link>
        </header>
    );
};

export default TopbarComponent;
