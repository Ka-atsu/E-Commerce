import React, { useState } from 'react';
import './dashboardComponent.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const TopbarComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

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
                />
            </Form>
            <Link to="/addProduct" className="btn btn-primary">+ ADD PRODUCT</Link>
        </header>
    );
};

export default TopbarComponent;
