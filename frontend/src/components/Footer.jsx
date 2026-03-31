import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaRegCopyright
} from 'react-icons/fa6'

function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="footer py-5">
                <div className="container">
                    <div className='row'>
                        <div className='col-md-6 col-lg-4'>
                            <img src={logo} alt="" className='footer-brand-logo mb-5'/>

                            <p className='footer-about mb-5'>
                                Experience the pinnacle of sartorial excellence. We craft premium formal wear for the modern gentleman, combining traditional tailoring with the finest Egyptian fabrics.
                            </p>

                            <ul className='footer-social-links d-flex gap-5'>
                                <li><Link><FaFacebookF /></Link></li>
                                <li><Link><FaInstagram /></Link></li>
                                <li><Link><FaLinkedinIn /></Link></li>
                                <li><Link><FaYoutube /></Link></li>
                            </ul>
                        </div>

                        <div className='col-md-6 col-lg-2'>
                            <h5 className='footer-title'>Collections</h5>

                            <ul className="footer-links">
                                <li><Link>Tailored Suits</Link></li>
                                <li><Link>Dress Shirts</Link></li>
                                <li><Link>Accessories</Link></li>
                                <li><Link>New Arrivals</Link></li>
                            </ul>
                        </div>

                        <div className='col-md-6 col-lg-2'>
                            <h5 className='footer-title'>Support</h5>

                            <ul className="footer-links">
                                <li><Link>Contact Us</Link></li>
                                <li><Link>Our Story</Link></li>
                                <li><Link>Shipping & Returns</Link></li>
                                <li><Link>Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <h5 className="footer-title">Join The Club</h5>

                            <p className="footer-about mb-5">Subscribe to receive exclusive collection updates and sartorial advice.</p>

                            <form className="newsletter-form d-flex">
                                <input type="email" placeholder="YOUR EMAIL ADDRESS" className="newsletter-input" />
                                <button type="submit" className="newsletter-btn text-uppercase">Join</button>
                            </form>
                        </div>
                    </div>

                    <div className="footer-bottom copyright-container mt-5 pt-4">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="copyright-text"><FaRegCopyright /> 2026 GentAura Menswear. All rights reserved.</p>
                            </div>
                            
                            <div className="col-md-6 text-center text-md-end">
                                <p className="copyright-text">Developed by Amin Ahmed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* End Footer */}
        </>
    )
}

export default Footer
