import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import DashboardFrame from './Components/Dashboard/DashboardFrame';
import AddProductFrame from './Components/Dashboard/AddProductFrame';
import EditProductFrame from './Components/Dashboard/EditProductFrame';
import ViewProductFrame from './Components/Dashboard/ViewProductFrame';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Routes>
            <Route path="/" exact element={<LoginComponent />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardFrame /></ProtectedRoute>} />
            <Route path="/addproduct" element={<ProtectedRoute><AddProductFrame /></ProtectedRoute>} />
            <Route path="/editproduct/:id" element={<ProtectedRoute><EditProductFrame /></ProtectedRoute>} />
            <Route path="/viewproduct/:id" element={<ProtectedRoute><ViewProductFrame /></ProtectedRoute>} />
        </Routes>
    );
}

export default App;
