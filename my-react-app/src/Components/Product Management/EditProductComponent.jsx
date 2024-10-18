import React, { useEffect, useState } from 'react';
import './productComponent.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductComponent = ({ productId }) => {
    const [viewProduct, setViewProduct] = useState([]);
    const [itemName, setItemName] = useState(viewProduct.item_name);
    const [itemDescription, setItemDescription] = useState(viewProduct.item_description);
    const [itemPrice, setItemPrice] = useState(viewProduct.item_amount);
    const [itemAvailableQuantity, setItemAvailableQuantity] = useState(viewProduct.item_available_quantity);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/view_product/${productId}`)
          .then(response => response.json())
          .then(data => setViewProduct(data))
          .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            item_name: itemName,
            item_description: itemDescription,
            item_amount: itemPrice,
            item_available_quantity: itemAvailableQuantity,
        };

        axios.put('http://127.0.0.1:8000/api/update_product/' + productId, data)
                .then(response => {navigate('/dashboard')})
                .catch(error => console.error('Error updating a product: ', error));
    }

    return (
        <div>
            <h1>Edit Product</h1>
            <div className='fieldsContainer'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID {viewProduct.id}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder={viewProduct.item_name} value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder={viewProduct.item_description} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' step='any' placeholder={viewProduct.item_amount} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number' placeholder={viewProduct.item_available_quantity} value={itemAvailableQuantity} onChange={(e) => setItemAvailableQuantity(e.target.value)} />
                    </Form.Group>
                    <div className="submitContainer">
                        <button className="btn btn-primary" type='submit'>Submit</button>
                        <Link to="/dashboard" className="btn btn-secondary" role="button">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProductComponent;