import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './CustomStyle.css'

const UserSideNavComponent = ({ onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const categories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals'];
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/productlist") {
      setDisabled(false);
    } else {
      setDisabled(true);
      setSelectedCategories([]);
      onCategoryChange([]); // Reset the categories when not on the correct page
    }
  }, [location.pathname, onCategoryChange]);

  const handleCategoryChange = (category) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelection);
    onCategoryChange(newSelection); // Notify parent component about the category change
  };

  return (
    <div className="sidebar2">
      <ul>
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
                disabled={disabled}
              />
              <label htmlFor={category} className="form-check-label ml-2">
                {category}
              </label>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default UserSideNavComponent;
