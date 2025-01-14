import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const[isSignup, setIsSignup] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await login(email, password);
        console.log(response);
        if (response.success) {
            navigate("/");
        } else {
            alert(response.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await signup(email, password);
        console.log(response);
        if (response.success) {
            navigate("/");
        } else {
            alert(response.message);
        }
    }
    
    return (
        <div>
            <div className='app-introduction'>
                <h1 >Welcome to Run It</h1>
                    <p>
                        Keep track of your running progress and set goals
                    </p>
                    <p>
                        Sign up or login to get started
                    </p>
                <div className='features-overview'>
                    <h2>Features</h2>
                    <ul>
                        <li>
                            <img className='feature' src='https://img.icons8.com/ios/452/running.png' alt='running icon'/>
                            <strong>Track your runs</strong>
                        </li>
                        <li>
                            <img className='feature' src='https://img.icons8.com/ios/452/goal.png' alt='goal icon'/>
                            <strong>Set goals</strong>
                        </li>
                        <li>
                            <img className='feature' src='https://img.icons8.com/?size=100&id=8309&format=png&color=000000' alt='progress icon'/>
                            <strong>View your progress</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <h2 className='auth-heading'>{isSignup ? "Sign Up" : "Login"}</h2>
            <form className='login-form' onSubmit={isSignup ? handleSignup : handleLogin}>
                {isSignup && (
                    <div>
                        <label id='name'>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label id='email'>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id='password'>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='authentic' type="submit">{isSignup ? "Sign Up" : "Login"}</button>
            </form>
            <p className='toggle-auth' onClick={() => setIsSignup(!isSignup)}
            /* style={{cursor: 'pointer', color: '#BAFF39', fontWeight:'700'}} */
            >
                {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
};

export default LoginPage;