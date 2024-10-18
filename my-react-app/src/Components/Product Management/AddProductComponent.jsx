import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './productComponent.css';
import { Link , useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToBeAdded = new FormData();
        dataToBeAdded.append('barcode', barcode);
        dataToBeAdded.append('name', name);
        dataToBeAdded.append('description', description);
        dataToBeAdded.append('price', price);
        dataToBeAdded.append('quantity', quantity);
        dataToBeAdded.append('category', category);
        dataToBeAdded.append('image', image); 

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
            <h1>Add Product</h1>
            <div className='fieldsContainer'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Barcode</Form.Label>
                        <Form.Control type='text' value={barcode} onChange={(e) => setBarcode(e.target.value)} />
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
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='file' onChange={(e) => setImage(e.target.files[0])} />
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
