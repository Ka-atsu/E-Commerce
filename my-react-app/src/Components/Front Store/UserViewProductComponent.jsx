import React, { useState, useEffect } from 'react';
import UserNavComponent from './UserNavComponent';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barcode from 'react-barcode';

const UserViewProductComponent = () => {
    const [viewProduct, setViewProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {    
        fetch(`http://127.0.0.1:8000/api/view_product/${id}`)
          .then(response => response.json())
          .then(data => setViewProduct(data))
          .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    return (
        <>
            <UserNavComponent />
            <div className="dashboardLayout">
                <div className="dashboardContent">
                    <div className="productView align-items-center">
                        <Container>
                            <Link 
                                to="/productlist" 
                                className='btn btn-outline-secondary' 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                Back 
                            </Link>
                            <Row className="mt-4">
                                {viewProduct.product_barcode && (
                                    <Col md={4}>
                                        <Barcode 
                                            value={viewProduct.product_barcode} 
                                            width={3} 
                                            height={50} 
                                        />
                                    </Col>
                                )}
                                <Col md={8}>
                                    <hr />
                                    <label><strong>Product Name:</strong> {viewProduct.product_name}</label><br />
                                    <label><strong>Description:</strong> {viewProduct.product_description}</label><br />
                                    <label><strong>Price:</strong> ₱{parseFloat(viewProduct.product_amount).toFixed(2)}</label><br />
                                    <label><strong>Category:</strong> {viewProduct.product_category}</label><br />
                                    <label><strong>Quantity:</strong> {viewProduct.product_available_quantity}</label><br />
                                    <hr />
                                    <p><strong>Item Description:</strong> {viewProduct.item_description}</p>
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
