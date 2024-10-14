import React, { useState } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import { products } from './Mock';
import './dashboardComponent.css';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteProductFrame from './DeleteProductFrame';

const DashboardFrame = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDeleteClick = (product) => {
        setProductToDelete(product); // Set the product to delete
        setShowDeleteModal(true); // Show the delete modal
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false); // Close the modal
        setProductToDelete(null); // Clear the product to delete
    };
    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <TopbarComponent />
            <div className="dashboardContent">
                <div className="productGrid">
                        {products.map(product => (
                            <div className="productCard" key={product.id} >
                                <img src={product.imageUrl}/>
                                <label>{product.name}</label>
                                <label>Barcode: {product.barcode}</label><br />
                                <label>Quantity: {product.quantity}</label><br />
                                <label>Price: ${product.price.toFixed(2)}</label>
                                <ListGroup horizontal>
                                    <ListGroup.Item><Link to={`/editproduct/${product.id}`} style={{textDecoration: "none" , color: 'inherit'}}>E</Link></ListGroup.Item>
                                    <ListGroup.Item><Link to={`/viewproduct/${product.id}`} style={{textDecoration: "none" , color: 'inherit'}}>V</Link></ListGroup.Item>
                                    <ListGroup.Item><input type="button" value="X" onClick={() => handleDeleteClick(product)} /></ListGroup.Item>
                                </ListGroup>
                            </div>
                        ))}
                </div>

                {showDeleteModal && productToDelete && (
                    <DeleteProductFrame
                        product={productToDelete}
                        handleClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardFrame;
