// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Check if the user's role is allowed
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/productlist" replace />; // Redirect to product list if not authorized
    }

    return children;
};

export default ProtectedRoute;