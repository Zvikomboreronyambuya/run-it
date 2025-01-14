import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute component.
 * Renders the Outlet component if the user is authenticated, otherwise redirects to the login page.
 *
 * @returns {JSX.Element} The rendered component.
 */
const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;