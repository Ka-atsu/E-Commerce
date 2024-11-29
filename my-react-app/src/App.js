import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import DashboardFrame from './Components/Dashboard/DashboardFrame';
import AddProductFrame from './Components/Dashboard/AddProductFrame';
import EditProductFrame from './Components/Dashboard/EditProductFrame';
import ViewProductFrame from './Components/Dashboard/ViewProductFrame';
import ProductList from './Components/Front Store/ProductList';
import UserViewProductComponent from './Components/Front Store/UserViewProductComponent';
import CartComponent from './Components/Front Store/CartComponent';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Example fetch call to populate cartItems (this can be modified based on your API)
        fetch('http://127.0.0.1:8000/api/cart')
            .then(response => response.json())
            .then(data => {
                setCartItems(data.cart || []); // Ensure it's an array
                setCartCount(data.cart.length);
            })
            .catch(error => console.error("Error fetching cart items:", error));
    }, []);

    return (
        <Routes>
            <Route path="/" exact element={<LoginComponent />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><DashboardFrame /></ProtectedRoute>} />
            <Route path="/addproduct" element={<ProtectedRoute allowedRoles={['admin']}><AddProductFrame /></ProtectedRoute>} />
            <Route path="/editproduct/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditProductFrame /></ProtectedRoute>} />
            <Route path="/viewproduct/:id" element={<ProtectedRoute allowedRoles={['admin']}><ViewProductFrame /></ProtectedRoute>} />
            <Route path="/productlist" element={<ProductList cartItems={cartItems}/>} />
            <Route path="/productcart" element={<CartComponent setCartCount={setCartCount} />} />
            <Route path="/viewuserproduct/:id" element={<UserViewProductComponent  cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
    );
}

export default App;