import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
import '../styles/Header.css'; 

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Run It</Link>
            </div>
            <nav className='header-nav'>
                <ul className='header-list'>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/goals'>Goals</Link>
                    </li>
                    <li>
                        <Link to='/progress'>Progress</Link>
                    </li>
                        {user ? (
                    <li>
                        <button className='logout' onClick={logout}>Logout</button>
                    </li>
                    ) : (
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    )}
                </ul>
            </nav>
        </header>   
    );
};

export default Header;