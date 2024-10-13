import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import AddProductFrame from './Components/Dashboard/AddProductFrame';
import EditProductFrame from './Components/Dashboard/EditProductFrame';

function App() {
    return (
        <Routes>
            <Route path="/addProduct" element={<AddProductFrame />} />
            <Route path="/editProduct" element={<EditProductFrame />} />
        </Routes>
    );
}

export default App;
