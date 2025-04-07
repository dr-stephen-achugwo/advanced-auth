import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth'; // Import the new function

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsAuth(authStatus);
            setLoading(false);
        };

        checkUserAuth();
    }, []);

    useEffect(() => {
        if (!loading && isAuth === false) {
            navigate('/login', { replace: true });
        }
    }, [loading, isAuth, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Show a loader while checking authentication
    }

    return isAuth ? children : null;
}

export default ProtectedRoute;
