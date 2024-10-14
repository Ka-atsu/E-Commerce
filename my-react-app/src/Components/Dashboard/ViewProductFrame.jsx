import React from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { useParams, Link } from 'react-router-dom';
import { products } from './Mock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewProductFrame = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <TopbarComponent />
            <div className="dashboardContent">
            <Container>
                <Row className="align-items-center">
                    <Col className='text-left'>
                        <h1>{product.name}</h1>
                    </Col>
                    <Col>
                        
                    </Col>
                    <Col className="text-right">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Back to Dashboard
                        </Link>
                    </Col>
                </Row>
            </Container>

                <div className="productGrid">
                    <div className="productView">
                        <img src={product.imageUrl} alt={product.name} />
                        <p>{product.description}</p>
                        <label>Barcode: {product.barcode}</label><br />
                        <label>Quantity: {product.quantity}</label><br />
                        <label>Price: ${product.price.toFixed(2)}</label><br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductFrame;
