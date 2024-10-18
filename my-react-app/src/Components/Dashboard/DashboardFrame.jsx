import React, { useState, useEffect  } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { Link  } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteProductFrame from './DeleteProductFrame';

const DashboardFrame = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [viewProducts, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/display_products')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching tasks: ', error));
    }, []);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const handleSearch = (input) => {
        const results = viewProducts.filter(product => 
            product.category.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredProducts(results);
    };

    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <TopbarComponent onSearch={handleSearch} />
            <div className="dashboardContent">
                <div className="productGrid">
                    {viewProducts.map(product => (
                        <div className="productCard" key={product.id}>
                            <div className="productInfo">
                                <img src={`http://127.0.0.1:8000/${product.item_image}`} alt={product.item_name} />
                                <label className='productName'>{product.item_name}</label>
                                <label>Barcode: {product.item_barcode}</label><br />
                                <label>Quantity: {product.item_available_quantity}</label><br />
                                <label>Price: ${parseFloat(product.item_amount).toFixed(2)}</label>
                            </div>
                            <div className="productActions">
                                <ListGroup horizontal>
                                    <ListGroup.Item>
                                        <Link to={`/editproduct/${product.id}`} style={{ textDecoration: "none", color: 'inherit' }}>E</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to={`/viewproduct/${product.id}`} style={{ textDecoration: "none", color: 'inherit' }}>V</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <input type="button" value="X" onClick={() => handleDeleteClick(product)} />
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </div>
                    ))}
                </div>

                {showDeleteModal && productToDelete && (
                    <DeleteProductFrame
                        viewProducts={productToDelete}
                        handleClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardFrame;
