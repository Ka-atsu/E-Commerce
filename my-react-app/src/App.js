import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import DashboardFrame from './Components/Dashboard/DashboardFrame';
import AddProductFrame from './Components/Dashboard/AddProductFrame';
import EditProductFrame from './Components/Dashboard/EditProductFrame';
import ViewProductFrame from './Components/Dashboard/ViewProductFrame';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Routes>
            <Route path="/login" exact element={<LoginComponent />} />
            <Route path="/" exact element={<DashboardFrame />} />
            <Route path="/addproduct" element={<AddProductFrame />} />
            <Route path="/editproduct/:id" element={<EditProductFrame />} />
            <Route path="/viewproduct/:id" element={<ViewProductFrame />} />
        </Routes>
    );
}

export default App;
