import React, { useState } from 'react';
import './dashboardComponent.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const TopbarComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Call the search function on input change
    };

    return (
        <header className='navTop'>
            <Form className="d-flex">
                <Form.Control 
                    type="search" 
                    placeholder="Search" 
                    className="me-1" 
                    value={searchTerm}
                    onChange={handleSearch} // Update on change
                />
            </Form>
            <Link to="/addProduct" className="btn btn-primary">+ ADD PRODUCT</Link>
        </header>
    );
};

export default TopbarComponent;
