import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './productComponent.css';

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
                    <div className="submitContainer">
                    <button type="submit">Submit</button>
                    <button type="button">Cancel</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddProductComponent;