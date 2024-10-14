import React from 'react';
import './productComponent.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { products } from '../Dashboard/Mock';

const EditProductComponent = ({ productId }) => {
    const product = products.find(p => p.id === parseInt(productId));

    return (
        <div>
            <h1>Edit Product</h1>
            <div className='fieldsContainer'>
                <Form>
                    <Form.Group>
                        <Form.Label>ID {product.id}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder={product.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder={product.description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number'placeholder={product.price}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number'placeholder={product.quantity}/>
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

export default EditProductComponent;