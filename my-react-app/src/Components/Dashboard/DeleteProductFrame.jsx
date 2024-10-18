import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navigation, useNavigate } from 'react-router-dom';

const DeleteProductFrame = ({ product, handleClose, onProductDeleted }) => {
    const productId = product.id;
    const productName = product.item_name;
    const navigate = useNavigate();

    const handleDeleteProduct = () => {
        fetch(`http://127.0.0.1:8000/api/delete_product/${productId}`,{
            method: 'DELETE'
        }).then(response => response.json())
        .then(response => {
            onProductDeleted(productId);
            handleClose();
        });
    };

    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {productName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProductFrame;
