import React from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import EditProductComponent from '../Product Management/EditProductComponent';
import { useParams } from 'react-router-dom';
import './dashboardComponent.css';

const EditProductFrame = () => {
    const { id } = useParams();
    return (
        <div className="dashboardLayout">
            <SidebarComponent />
            <TopbarComponent />
            <div className="dashboardContent">
                <EditProductComponent productId={id}/>
            </div>
        </div>
    );
};

export default EditProductFrame;
