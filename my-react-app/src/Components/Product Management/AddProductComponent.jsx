import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './productComponent.css';
import { Link } from 'react-router-dom';

const AddProductComponent = () => {
    return (
        <div>
            <h1>Add Product</h1>
            <div className='fieldsContainer'>
                <Form>
                    <Form.Group>
                        <Form.Label>Barcode</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='file'/>
                    </Form.Group>
                    <div className="submitContainer mt-4">
                    <Link to="/dashboard" className="btn btn-primary" role="button" type='submit'>Submit</Link>
                    <Link to="/" className="btn btn-secondary" role="button">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddProductComponent;