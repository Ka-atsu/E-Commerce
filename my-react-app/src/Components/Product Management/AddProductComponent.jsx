import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode'; 
import Form from 'react-bootstrap/Form';
import './productComponent.css';
import { Link, useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    
    const generateProductCode = () => {
        return 'P-' + Math.floor(100000 + Math.random() * 900000);
    };

    
    useEffect(() => {
        const generatedBarcode = generateProductCode();
        setBarcode(generatedBarcode);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToBeAdded = new FormData();
        dataToBeAdded.append('product_barcode', barcode); 
        dataToBeAdded.append('product_name', name);
        dataToBeAdded.append('product_description', description);
        dataToBeAdded.append('product_amount', price);
        dataToBeAdded.append('product_available_quantity', quantity);
        dataToBeAdded.append('product_category', category);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_product', {
                method: 'POST',
                body: dataToBeAdded, 
            });

            if (response.ok) {
                console.log("Product added successfully!");
                navigate('/dashboard');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className='fieldsContainer'>
                <h1 className='text-center'>Add Product</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Product Code (Barcode)</Form.Label>
                        <Form.Control type='text' value={barcode} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Barcode</Form.Label>
                        <Barcode value={barcode}  width={2} height={50}/> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="Sneakers">Sneakers</option>
                            <option value="Loafers">Loafers</option>
                            <option value="Cycling Shoes">Cycling Shoes</option>
                            <option value="Sandals">Sandals</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="submitContainer mt-4">
                        <button className="btn btn-primary" type='submit'>Submit</button>
                        <Link to="/dashboard" className="btn btn-secondary" role="button">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddProductComponent;
