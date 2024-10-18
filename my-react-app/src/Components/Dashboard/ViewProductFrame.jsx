import React, { useState, useEffect } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewProductFrame = () => {
    const [viewProduct, setViewProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {    
        fetch(`http://127.0.0.1:8000/api/view_product/${id}`)
          .then(response => response.json())
          .then(data => setViewProduct(data))
          .catch(error => console.error('Error fetching tasks:', error));
    }, [id]);

    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <TopbarComponent />
            <div className="dashboardContent">
            <Container>
                <Row className="align-items-center">
                    <Col className='text-left'>
                        <h1>{viewProduct.name}</h1>
                    </Col>
                    <Col>
                        
                    </Col>
                    <Col className="text-right">
                        <Link to="/dashboard" className='btn btn-outline-secondary' style={{ textDecoration: 'none', color: 'inherit' }}>
                            Back to Dashboard
                        </Link>
                    </Col>
                </Row>
            </Container>

                <div className="productGrid">
                    <div className="productView">
                        <img src={`http://127.0.0.1:8000/${viewProduct.item_image}`} alt={viewProduct.item_name} />
                        <p>{viewProduct.item_description}</p>
                        <label>Barcode: {viewProduct.item_barcode}</label><br />
                        <label>Quantity: {viewProduct.item_available_quantity}</label><br />
                        <label>Price: ${parseFloat(viewProduct.item_amount).toFixed(2)}</label><br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductFrame;
