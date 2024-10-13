import React from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import EditProductComponent from '../Product Management/EditProductComponent';
import './dashboardComponent.css';

const EditProductFrame = () => {
    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <div className="dashboardContent">
                <TopbarComponent />
                {<EditProductComponent />}
            </div>
        </div>
    );
};

export default EditProductFrame;
