
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
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
axios.post('http://localhost/login/register.php', {
username: username,
password: password
})
.then(response => {
if (response.data==='success') {
alert('Register Success..');
navigate('../', {replace : true});
} else {
alert('Unable to register');
}
})
.catch(error => {
console.log(error);
});
};
return (
    <div className="auth-form-container">
    <h3>Sign Up</h3>
<form className="register-form" onSubmit={handleSubmit}>
    <label htmlFor="name"className="username-label">User Name</label>
    <input className="custom-input" value={username} name="name" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="full Name" />
    
    <label htmlFor="password"className="password-label">Password</label>
    <input className="custom-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
    <button type="submit" className="btn">Done</button>
</form>
<button className="link-btn" onClick={() => navigate('/')}>Already have an account? Login here.</button>
</div>
);
}
export default Register;
