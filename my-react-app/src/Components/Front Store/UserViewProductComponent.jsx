import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserNavComponent from "./UserNavComponent"; 

const UserViewProductComponent = ({ cartCount, setCartCount }) => {
    const [viewProduct, setViewProduct] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/view_product/${id}`)
            .then(response => response.json())
            .then(data => setViewProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === viewProduct.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: viewProduct.id,
                name: viewProduct.product_name,
                price: viewProduct.product_amount,
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count state in the parent
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));

        // Show feedback message
        setFeedbackMessage(`${viewProduct.product_name} has been added to the cart!`);
        setTimeout(() => setFeedbackMessage(''), 3000);
    };

    return (
        <>
            <UserNavComponent handleSearch={() => {}} cartCount={cartCount} />
            <div className="dashboardLayout">
                <div className="dashboardContent">
                    <div className="productView align-items-center">
                        <Container>
                            <Link to="/productlist" className="btn btn-outline-secondary">
                                Back 
                            </Link>
                            {feedbackMessage && (
                                <div className="alert alert-success mt-3">
                                    {feedbackMessage}
                                </div>
                            )}
                            <Row className="mt-4">
                                < Col md={8}>
                                    <hr />
                                    <label><strong>Product Name:</strong> {viewProduct.product_name}</label><br />
                                    <label><strong>Description:</strong> {viewProduct.product_description}</label><br />
                                    <label><strong>Price:</strong> ₱{parseFloat(viewProduct.product_amount).toFixed(2)}</label><br />
                                    <label><strong>Category:</strong> {viewProduct.product_category}</label><br />
                                    <label><strong>Quantity:</strong> {viewProduct.product_available_quantity}</label><br />
                                    <hr />
                                    <button 
                                        className="btn btn-primary mt-3"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserViewProductComponent;