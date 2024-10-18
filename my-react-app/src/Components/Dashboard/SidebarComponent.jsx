import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboardComponent.css';

const SidebarComponent = ({ onCategoryChange }) => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals']; 

    const handleDashboardClick = () => {
        navigate('/dashboard'); 
        window.location.reload(); 
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); 
        navigate("/"); 
    };

    const handleCategoryChange = (category) => {
        const newSelection = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newSelection);
        onCategoryChange(newSelection); 
    };

    return (
        <div className='sidebar'>
            <h1>Site Name</h1>
            <ul>
                <li>
                    <Link onClick={handleDashboardClick}>Dashboard</Link>
                </li>
                <li>
                    <h4>Categories</h4>
                    {categories.map((category, index) => (
                        <div key={index} className="form-check mb-2"> 
                        <input
                            type="checkbox"
                            id={category}
                            className="form-check-input"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            aria-label={`Select ${category}`} // Added accessibility
                        />
                        <label htmlFor={category} className="form-check-label ml-2">{category}</label> 
                    </div>
                    ))}
                </li>
                <li>
                    <button className="customButton" onClick={handleLogout}>Sign Out</button>
                </li>
            </ul>
        </div>
    );
};

export default SidebarComponent;
