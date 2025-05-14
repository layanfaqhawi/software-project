import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, registerUser } from '../../services/api'; // Adjust the import path as necessar
import { loginUser } from '../../services/api'; // Adjust the import path as necessary
import './auth.css';

const Auth: React.FC = () => {
    const [isLoginActive, setIsLoginActive] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [loginFormData, setLoginFormData] = useState({
        loginEmail: '',
        loginPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleToggle = () => {
        setIsLoginActive(!isLoginActive);
    };

    const register = async () => {

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const data = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };
            await registerUser(data);
            handleToggle();
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    }

    const login = async () => {
        console.log('Login data:', loginFormData); // Log the login data for debugging
        try {
            const data = {
                email: loginFormData.loginEmail,
                password: loginFormData.loginPassword
            };
            console.log('Login data 2:', data); // Log the login data for debugging
            const response = await loginUser(data);
            console.log('Login response:', response); // Log the login response for debugging
            localStorage.setItem('token', response.token);
            const url = await getDashboard(response);
            console.log('Dashboard URL:', url); // Log the dashboard URL for debugging
            navigate(url.redirect);
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    }


    return (
        <div className={`container ${isLoginActive ? '' : 'right-panel-active'}`}>
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <div className="input-group">
                        <input type="text" placeholder="First Name" name='firstName' value={formData.firstName} onChange={handleChange} />
                        <input type="text" placeholder="Last Name" name='lastName' value={formData.lastName} onChange={handleChange}/>
                    </div>
                    <input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange}/>
                    <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
                    <input type="password" placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
                    <select name="role" value={formData.role} onChange={handleSelectChange}>
                        <option value="">Select Role</option>
                        <option value="STUDENT">Student</option>
                        <option value="INSTRUCTOR">Instructor</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <button type="button" onClick={register}>SIGN UP</button>
                </form>
            </div>

            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <input type="email" placeholder="Email" name='loginEmail' value={loginFormData.loginEmail} onChange={handleChange}/>
                    <input type="password" placeholder="Password" name='loginPassword' value={loginFormData.loginPassword} onChange={handleChange}/>
                    <a href="#">Forgot your password?</a>
                    <button type="button" onClick={login}>SIGN IN</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>If you already have an account, sign in here</p>
                        <button className="ghost" onClick={handleToggle}>SIGN IN</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New Here?</h1>
                        <p>Create your account and join us today</p>
                        <button className="ghost" onClick={handleToggle}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
