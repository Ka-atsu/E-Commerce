import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import DashboardFrame from './Components/Dashboard/DashboardFrame';
import AddProductFrame from './Components/Dashboard/AddProductFrame';
import EditProductFrame from './Components/Dashboard/EditProductFrame';
import ViewProductFrame from './Components/Dashboard/ViewProductFrame';
import ProductList from './Components/Front Store/ProductList';
import UserViewProductComponent from './Components/Front Store/UserViewProductComponent';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }, []);

    return (
        <Routes>
            <Route path="/" exact element={<LoginComponent />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardFrame /></ProtectedRoute>} />
            <Route path="/addproduct" element={<ProtectedRoute><AddProductFrame /></ProtectedRoute>} />
            <Route path="/editproduct/:id" element={<ProtectedRoute><EditProductFrame /></ProtectedRoute>} />
            <Route path="/viewproduct/:id" element={<ProtectedRoute><ViewProductFrame /></ProtectedRoute>} />
            <Route path="/productlist" element={<ProductList cartCount={cartCount} />} />
            <Route path="/viewuserproduct/:id" element={<UserViewProductComponent cartCount={cartCount} setCartCount={setCartCount} />} />
        </Routes>
    );
}

export default App;