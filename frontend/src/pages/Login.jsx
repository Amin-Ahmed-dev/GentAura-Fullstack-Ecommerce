import React, { useState, useContext } from 'react';
import MetaHelper from '../components/MetaHelper';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { validateField } from '../utils/formValidation';
import { showSuccess, showError } from '../utils/alertService';
import PageHeader from '../components/PageHeader';
import loginImg from '../assets/login.jpg';
import { LuMail, LuEye, LuEyeOff } from "react-icons/lu";


function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form Data State
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
        const fieldError = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: fieldError }))
    }

    // Handle Input Blur
    const handleBlur = (e) => {
        const { name, value } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
        
        const fieldError = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: fieldError }))
    }

    // Handle Form Submission
     const handleSubmit = async (e) => {
        e.preventDefault()
        
        setTouched({ email: true, password: true });

        const emailErr = validateField('email', formData.email)
        const passErr = validateField('password', formData.password)

        if (emailErr || passErr) {
            setErrors({ email: emailErr, password: passErr })
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData)
            
            if (response.data.token) {
                login(response.data.user, response.data.token)
                showSuccess('Login Successfully', `Welcome back, ${response.data.user.name.split(' ')[0]}`)

                navigate('/')
                window.scrollTo(0, 0)
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                showError('Login Failed', error.response.data.message)
            } else {
                showError("Login failed. Please check your connection.")
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <MetaHelper 
                title="Login" 
                description="Login to your GentAura account to manage your orders, view your wishlist, and continue your journey in formal excellence." 
            />

            <PageHeader PageTitle={`Login`} />
            
            {/* Login Auth Section */}
            <section className="auth-section py-5">
                <div className='container py-5'>
                    <div className='auth-container'>
                        <div className='row g-0'> 
                            <div className='col-lg-6 d-none d-lg-block'>
                                <div className='auth-img-wrapper h-100 position-relative'>
                                    <img src={loginImg} alt="" className='auth-img' />
                                </div>
                            </div>

                            <div className='col-lg-6 d-flex align-items-center'>
                                <form onSubmit={handleSubmit} className='auth-form p-5 m-4 w-100 d-flex flex-column gap-4'>
                                    <div className='mb-4'>
                                        <h2 className='mb-2'>Welcome Back</h2>
                                        <p style={{ color: 'var(--silver-dark)' }}>Login to continue your sartorial journey.</p>
                                    </div>

                                    <div className='form-group'>
                                        <div className='input-wrapper position-relative'>
                                            <input 
                                                type="text"
                                                className={`form-control w-100 ${touched.email && errors.email ? 'is-invalid' : ''} ${touched.email && !errors.email ? 'is-valid' : ''}`}
                                                placeholder='Email Address'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <div className='input-icon d-flex align-items-center justify-content-center'>
                                                <LuMail size={24} />
                                            </div>
                                        </div>

                                        <p className="error-text">{touched.email && errors.email ? errors.email : ""}</p>
                                    </div>

                                    <div className='form-group'>
                                        <div className='input-wrapper position-relative'>
                                            <input 
                                                type={isPasswordVisible ? "text" : "password"}
                                                className={`form-control w-100 ${touched.password && errors.password ? 'is-invalid' : ''} ${touched.password && !errors.password ? 'is-valid' : ''}`}
                                                placeholder='Password'
                                                name='password'
                                                value={formData.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <div className='input-icon d-flex align-items-center justify-content-center'>
                                                <button
                                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                >
                                                    {
                                                        isPasswordVisible ? <LuEye size={22} /> : <LuEyeOff size={22} />
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        <p className="error-text">{touched.password && errors.password ? errors.password : ""}</p>
                                    </div>

                                    <button
                                        className='btn btn-primary'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Athenticating..." : "Login"}
                                    </button>

                                    <div className='auth-form-footer text-center pt-4 mt-4'>
                                        <p>New to GentAura? <Link to={`/register`}>Register</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            {/* End Login Auth Section */}
        </>
    )
}

export default Login
