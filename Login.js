import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
const [username, setUsername]=useState('');
const [password, setPassword]=useState('');

const handleUsernameChange = event => {
setUsername(event.target.value);
};

const handlePasswordChange = event => {
setPassword(event.target.value);
};

const handleSubmit = event => {
event.preventDefault();
axios.post('http://localhost/login/login.php', {
username: username,
password: password
})
.then(response => {
if (response.data==='success') {
alert('Login Successful..');
localStorage.setItem('token', true)
navigate('user');

} else {
alert('Invalid username or password');
}
})
.catch(error => {
console.log(error);
});
};
return (
<div className="auth-form-container">
            <h3>LOGIN</h3>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username"className="username-label">UserName</label>
                <input className="custom-input" value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="User Name" id="username" name="username" />
                <label htmlFor="password"className="password-label">Password</label>
                <input className="custom-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" className="btn">Log In</button>
            </form>
            <button className="link-btn" onClick={() => navigate('register')}>Don't have an account? Register here.</button>
        </div>

);
}
export default Login;
