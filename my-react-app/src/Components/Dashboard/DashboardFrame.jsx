import React, { useState  } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import { products } from './Mock';
import './dashboardComponent.css';
import { Link  } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteProductFrame from './DeleteProductFrame';

const DashboardFrame = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const handleSearch = (input) => {
        const results = products.filter(product => 
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
                    {filteredProducts.map(product => (
                        <div className="productCard" key={product.id}>
                            <div className="productInfo">
                                <img src={product.imageUrl} alt={product.name} />
                                <label className='productName'>{product.name}</label>
                                <label>Barcode: {product.barcode}</label><br />
                                <label>Quantity: {product.quantity}</label><br />
                                <label>Price: ${product.price.toFixed(2)}</label>
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
                        product={productToDelete}
                        handleClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardFrame;
