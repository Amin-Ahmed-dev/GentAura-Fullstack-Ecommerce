import React, { useState } from 'react';
import MetaHelper from '../components/MetaHelper';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateField } from '../utils/formValidation';
import { showSuccess, showError } from '../utils/alertService';
import PageHeader from '../components/PageHeader'
import registerImg from '../assets/register.jpg'
import { LuUser, LuMail, LuEye, LuEyeOff } from "react-icons/lu"

function Register() {
    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form Data State
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
       
        setTouched({ name: true, email: true, password: true })

        const nameErr = validateField('name', formData.name)
        const emailErr = validateField('email', formData.email)
        const passErr = validateField('password', formData.password)

        if (nameErr || emailErr || passErr) {
            setErrors({ name: nameErr, email: emailErr, password: passErr })
            return;
        }

        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);

            if (response.status === 201) {
                showSuccess("Account Created", "Welcome to GentAura. Please sign in to continue.")
                navigate('/login')
            }
        } catch (error) {
            showError("Registration Failed", error.response?.data?.message || "Something went wrong.");
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <MetaHelper 
                title="Create Account" 
                description="Join the GentAura community. Register today for exclusive access to our latest collections and a seamless sartorial experience." 
            />

            <PageHeader PageTitle={`Create Account`} />

            {/* Register Auth Section */}
            <section className="auth-section py-5">
                <div className='container py-5'>
                    <div className='auth-container'>
                        <div className='row g-0'> 
                            <div className='col-lg-6 d-none d-lg-block'>
                                <div className='auth-img-wrapper h-100 position-relative'>
                                    <img src={registerImg} alt="" className='auth-img' />
                                </div>
                            </div>

                            <div className='col-lg-6 d-flex align-items-center'>
                                <form onSubmit={handleSubmit} className='auth-form p-5 m-4 w-100 d-flex flex-column gap-4'>
                                    <div className='mb-4'>
                                        <h2 className='mb-2'>Join GentAura</h2>
                                        <p style={{ color: 'var(--silver-dark)' }}>Experience the pinnacle of formal menswear.</p>
                                    </div>

                                    <div className='form-group'>
                                        <div className='input-wrapper position-relative'>
                                            <input 
                                                type="text"
                                                className={`form-control w-100 ${touched.name && errors.name ? 'is-invalid' : ''} ${touched.name && !errors.name ? 'is-valid' : ''}`}
                                                placeholder='Full Name'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                            />

                                            <div className='input-icon d-flex align-items-center justify-content-center'>
                                                <LuUser size={26} />
                                            </div>
                                        </div>

                                        <p className="error-text">{touched.name && errors.name ? errors.name : ""}</p>
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
                                                    type='button'
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
                                        {isLoading ? 'Creating Account...' : 'Register'}
                                    </button>

                                    <div className='auth-form-footer text-center pt-4 mt-4'>
                                        <p>Already Have An Account? <Link to={`/login`}>Login</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            {/* End Register Auth Section */}
        </>
    )
}

export default Register
