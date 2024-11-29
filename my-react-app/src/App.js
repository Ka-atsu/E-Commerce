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
    return (
        <Routes>
            <Route path="/" exact element={<LoginComponent />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><DashboardFrame /></ProtectedRoute>} />
            <Route path="/addproduct" element={<ProtectedRoute allowedRoles={['admin']}><AddProductFrame /></ProtectedRoute>} />
            <Route path="/editproduct/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditProductFrame /></ProtectedRoute>} />
            <Route path="/viewproduct/:id" element={<ProtectedRoute allowedRoles={['admin']}><ViewProductFrame /></ProtectedRoute>} />
            <Route path="/productlist" element={<ProductList/>} />
            <Route path="/productcart" element={<CartComponent />} />
            <Route path="/viewuserproduct/:id" element={<UserViewProductComponent />} />
        </Routes>
    );
}

export default App;