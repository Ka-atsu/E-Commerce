import React, { useState, useEffect } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteProductFrame from './DeleteProductFrame';

const DashboardFrame = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [allProducts, setAllProducts] = useState([]); 
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedCategories, setSelectedCategories] = useState([]); 

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/display_products')
            .then(response => response.json())
            .then(data => {
                setAllProducts(data.products);
                setFilteredProducts(data.products); 
            })
            .catch(error => console.error('Error fetching products: ', error));
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchTerm, selectedCategories]);

    const filterProducts = () => {
        let filtered = allProducts;
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.item_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => 
                selectedCategories.includes(product.item_category)
            );
        }
        setFilteredProducts(filtered); 
    };

    const handleSearch = (input) => {
        setSearchTerm(input);
    };

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories); 
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    }

    const handleProductDeleted = (deletedProductId) => {
        const updatedProducts = allProducts.filter(product => product.id !== deletedProductId);
        setAllProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    return (
        <div className="dashboardLayout">
            <SidebarComponent onCategoryChange={handleCategoryChange} />
            <TopbarComponent onSearch={handleSearch} />
            <div className="dashboardContent">
                <div className="productGrid">
                    {filteredProducts.map(product => (
                        <div className="productCard" key={product.id}>
                            <div className="productInfo">
                                <img src={`http://127.0.0.1:8000/${product.item_image}`} alt={product.item_name} />
                                <label className='productInfo'>{product.item_name}</label>
                                <label className='productInfo'>Barcode: {product.item_barcode}</label>
                                <label>Quantity: {product.item_available_quantity}</label><br />
                                <label>₱{parseFloat(product.item_amount).toFixed(2)}</label>
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
                        onProductDeleted={handleProductDeleted}
                    />
                )} 
            </div>
        </div>
    );
};

export default DashboardFrame;
