import React, { useEffect, useState } from 'react';
import './productComponent.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Barcode from 'react-barcode';

const EditProductComponent = ({ productId }) => {
    const [viewProduct, setViewProduct] = useState([]);
    const [itemName, setItemName] = useState(viewProduct.product_name);
    const [itemDescription, setItemDescription] = useState(viewProduct.product_description);
    const [itemPrice, setItemPrice] = useState(viewProduct.product_amount);
    const [itemAvailableQuantity, setItemAvailableQuantity] = useState(viewProduct.product_available_amount);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/view_product/${productId}`)
          .then(response => response.json())
          .then(data => {
                setViewProduct(data);
                setItemName(data.product_name);
                setItemDescription(data.product_description);
                setItemPrice(data.product_amount);
                setItemAvailableQuantity(data.product_available_quantity);
            })
          .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            product_name: itemName,
            product_description: itemDescription,
            product_amount: itemPrice,
            product_available_quantity: itemAvailableQuantity,
        };

        axios.put('http://127.0.0.1:8000/api/update_product/' + productId, data)
                .then(response => {navigate('/dashboard')})
                .catch(error => console.error('Error updating a product: ', error));
    }

    return (
        <div>
            <div className='fieldsContainer'>
                <h1 className='text-center'>Edit Product</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Barcode:
                        <Barcode value={viewProduct.product_barcode}  width={2} height={50}/></Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder={viewProduct.product_name} value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder={viewProduct.product_description} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' step='any' placeholder={viewProduct.product_amount} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number' placeholder={viewProduct.product_available_quantity} value={itemAvailableQuantity} onChange={(e) => setItemAvailableQuantity(e.target.value)} />
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