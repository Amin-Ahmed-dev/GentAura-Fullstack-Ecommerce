import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone} from 'react-icons/fa6'


function Topbar() {
    return (
      <>
        {/* Top Bar */}
        <div className='top-bar d-flex'>
            <div className='container d-flex align-items-center'>
                {/* To Bar Social Media Links */}
                <ul className="top-bar-social-links list-unstyled d-none d-lg-flex align-items-center gap-3">
                    <li>
                        <Link className="top-bar-social-link"><FaFacebookF size={16} /></Link>
                    </li>

                    <li>
                        <Link className="top-bar-social-link"><FaInstagram size={16}  /></Link>
                    </li>

                    <li>
                        <Link className="top-bar-social-link"><FaLinkedinIn size={16}  /></Link>
                    </li>

                    <li>
                        <Link className="top-bar-social-link"><FaYoutube size={16}  /></Link>
                    </li>
                </ul>

                {/* Top Bar Promo */}
                <p className='top-bar-promo flex-fill text-center text-uppercase'>
                    complimentary shipping on orders over egp 3,000
                </p>

                {/* Top Bar Contact Info */}
                <ul className='top-bar-contact list-unstyled d-none d-lg-flex align-items-center gap-4'>
                    <li>
                        <Link className='d-flex align-items-center gap-2'><FaPhone size={16} /> <span>Call Us</span></Link>
                    </li>

                    <li>
                        <Link className='d-flex align-items-center gap-2'><FaEnvelope size={16} /> <span>Support</span></Link>
                    </li>
                </ul>
            </div>
        </div>
        {/* End Top Bar */}
      </> 
    )
}

export default Topbar
