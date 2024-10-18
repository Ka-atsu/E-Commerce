import React, { useEffect, useState } from 'react';
import './productComponent.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const EditProductComponent = ({ productId }) => {
    const [viewProduct, setViewProduct] = useState([]);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/view_product/${productId}`)
          .then(response => response.json())
          .then(data => setViewProduct(data))
          .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div>
            <h1>Edit Product</h1>
            <div className='fieldsContainer'>
                <Form>
                    <Form.Group>
                        <Form.Label>ID {viewProduct.id}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder={viewProduct.item_name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder={viewProduct.item_description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number'placeholder={viewProduct.item_amount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number'placeholder={viewProduct.item_available_quantity}/>
                    </Form.Group>
                    <div className="submitContainer">
                    <Link to="/dashboard" className="btn btn-primary" role="button" type='submit'>Submit</Link>
                    <Link to="/" className="btn btn-secondary" role="button">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProductComponent;