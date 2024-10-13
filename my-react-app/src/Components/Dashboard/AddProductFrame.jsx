import React from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import AddProductComponent from '../Product Management/AddProductComponent';
import './dashboardComponent.css';

const AddProductFrame = () => {
    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <div className="dashboardContent">
                <TopbarComponent />
                {<AddProductComponent />}
            </div>
        </div>
    );
};

export default AddProductFrame;
