import React from 'react';
import { Link } from 'react-router-dom'; 
import './dashboardComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const TopbarComponent = () => {
    return (
        <header className='navTop'>
            <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-1" />
                <Button variant="secondary">Search</Button>
            </Form>
            <Link to="/addProduct" className="btn btn-primary">+ ADD PRODUCT</Link>
        </header>
    );
}

export default TopbarComponent;
