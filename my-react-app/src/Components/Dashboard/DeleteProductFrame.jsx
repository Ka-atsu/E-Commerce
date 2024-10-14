import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteProductFrame = ({ product, handleClose }) => {

    const handleDeleteProduct = () => {
        console.log('Deleting product:', product.name);
        // Perform actual delete logic here, like calling an API or updating state
        handleClose(); // Close the modal after deleting
    };

    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {product.name}?
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
