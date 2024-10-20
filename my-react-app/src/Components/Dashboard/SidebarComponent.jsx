import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './dashboardComponent.css';

const SidebarComponent = ({ onCategoryChange  }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [disabled, setDisabled] = useState(false); // State to track whether checkboxes are disabled

    const categories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals']; 

    useEffect(() => {
        // Disable checkboxes if not on the dashboard
        if (location.pathname === '/dashboard') {
            setDisabled(false); // Enable checkboxes when on the dashboard
        } else {
            setDisabled(true);
            setSelectedCategories([]); 
            onCategoryChange([]); 
        }
    }, [location.pathname, onCategoryChange]); // Dependency on pathname and onCategoryChange

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
        <div className='sidebar align-items-center'>
            <h1>Site Name</h1>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
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
                                disabled={disabled} // Disable based on state
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
