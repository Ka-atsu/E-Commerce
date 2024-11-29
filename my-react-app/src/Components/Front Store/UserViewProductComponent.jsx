import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserNavComponent from "./UserNavComponent"; 

const UserViewProductComponent = ({ cartItems, setCartItems }) => {
    const [viewProduct, setViewProduct] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/view_product/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setViewProduct(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const existingItem = cartItems.find(item => item.id === viewProduct.id);
    
            if (existingItem) {
                // If the item already exists, just update its quantity
                setFeedbackMessage(`${viewProduct.product_name} is already in your cart. Quantity updated.`);
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === viewProduct.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                // If the item doesn't exist, add it to the cart
                const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        product_id: viewProduct.id,
                        name: viewProduct.product_name,
                        amount: viewProduct.product_amount,
                        quantity: 1,
                    }),
                });
    
                if (!response.ok) throw new Error('Failed to add product to cart');
    
                const cartData = await response.json();
                setCartItems(prevItems => [...prevItems, cartData]); // Add new item to cart
                setFeedbackMessage(`${viewProduct.product_name} has been added to your cart!`);
            }
    
            setTimeout(() => setFeedbackMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };
    
    return (
        <>
            <UserNavComponent cartCount={cartItems.filter((item, index, self) => index === self.findIndex(t => t.id === item.id)).length} />
            <Container>
                <Link to="/productlist" className="btn btn-outline-secondary">Back</Link>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {feedbackMessage && <div className="alert alert-success">{feedbackMessage}</div>}
                <Row>
                    <Col md={8}>
                        <h3>{viewProduct.product_name}</h3>
                        <p>{viewProduct.product_description}</p>
                        <p>Price: ₱{parseFloat(viewProduct.product_amount).toFixed(2)}</p>
                        <p>Available Quantity: {viewProduct.product_available_quantity}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            disabled={viewProduct.product_available_quantity <= 0}
                        >
                            {viewProduct.product_available_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserViewProductComponent;