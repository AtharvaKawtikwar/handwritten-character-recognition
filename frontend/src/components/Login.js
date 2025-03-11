import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            localStorage.setItem('token', response.data.access);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password.');
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;