import React, { useState, useContext } from 'react';
import './Signup.css';
import { Context } from '../Context/LogInContext.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ToastComponent from './ToastComponent.js';

const BaseUrl = process.env.REACT_APP_BASE_URL;

export default function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    const { setShowSignup, setShowLogin } = useContext(Context);

    const notify = (message, type) => toast(message, { type });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch(`${BaseUrl}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors(
                    Array.isArray(data.errors) ? 
                    data.errors.reduce((acc, err) => ({
                        ...acc, [err.path]: [...(acc[err.path] || []), err.msg]
                    }), {}) 
                    : { general: data.errors || "An error occurred. Please try again." }
                );
                notify(`${data.errors[0].msg}`, 'warning');
                return;
            }

            notify('Signup successful! Redirecting...', 'success');
            setTimeout(() => {
                setShowSignup(false);
                setShowLogin(true);
                setFormData({ username: '', email: '', password: '' });
            }, 1000);

        } catch {
            setErrors({ general: 'Network error. Please try again later.' });
            notify('Network error. Please try again later.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='signup-component'>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    {errors.general && <div className="error">{errors.general}</div>}

                    {['username', 'email', 'password'].map(field => (
                        <div key={field} className="form-group">
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <div className={field === 'password' ? 'password-input-container' : ''}>
                                <input
                                    type={field === 'password' && !showPassword ? "password" : "text"}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                />
                                {field === 'password' && (
                                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                )}
                            </div>
                            {errors[field]?.map((err, i) => <div key={i} className="error">{err}</div>)}
                        </div>
                    ))}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
            <ToastComponent />
        </div>
    );
}
