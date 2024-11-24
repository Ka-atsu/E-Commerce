import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import './CustomStyle.css';
import UserSideNavComponent from "./UserSideNavComponent";
import UserNavComponent from "./UserNavComponent";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/display_products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // Assuming the response contains a `products` array
      })
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories); // Update the selected categories state
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.product_category);
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <UserNavComponent handleSearch={handleSearch} />
      <div style={{ display: "flex" }}>
        <UserSideNavComponent onCategoryChange={handleCategoryChange} />
        <Container className="py-4">
          <Row className="gy-1 gx-2">
            {filteredProducts.map((product) => (
              <Col key={product.id} md={3}>
                <Link to={`/viewuserproduct/${product.id}`} className="text-decoration-none">
                  <Card className="h-100 custom-card">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.product_name}</Card.Title>
                      <Card.Text>{product.product_description}</Card.Text>
                      <div className="mt-auto">
                        <Card.Text>
                          <strong>Price:</strong> ₱{parseFloat(product.product_amount).toFixed(2)}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductList;
