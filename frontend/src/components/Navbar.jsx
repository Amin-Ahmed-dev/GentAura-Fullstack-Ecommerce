import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { NavLink, Link } from 'react-router-dom'
import MiniCart from './MiniCart';
import Wishlist from './Wishlist';
import logo from '../assets/logo.png'; 
import { LuShoppingBag, LuHeart, LuUser, LuDoorOpen, LuCircleUser } from 'react-icons/lu';


function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)


    const { cartCounter } = useContext(CartContext)
    const { wishlistCounter } = useContext(WishlistContext);

    const { isLoggedIn, user, logout } = useContext(AuthContext);


    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container">
                    {/* Brand Logo */}
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="GentAura Logo" className='navbar-brand-logo' />
                    </Link>

                    {/* Navbar Toggler */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links Container */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-fill d-flex align-items-center justify-content-center gap-4">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shop">Shop</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/collections">Collections</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/arrivals">New Arrivals</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About Us</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </ul>

                        {
                            isLoggedIn ? (
                                <ul className='navbar-nav mb-2 mb-lg-0 align-items-center gap-5'>
                                    <li className='nav-item'>
                                        <button className='user-actions-btn' onClick={() => setIsWishlistOpen(true)}>
                                            <LuHeart size={20}  className='user-actions-icon'/>

                                            {
                                                wishlistCounter > 0 && (
                                                    <span className='user-actions-badge d-flex align-items-center justify-content-center'>
                                                        { wishlistCounter }
                                                    </span>
                                                )
                                            }
                                        </button>
                                    </li>

                                    <li className='nav-item'>
                                        <button className='user-actions-btn'  onClick={() => setIsCartOpen(true)}>
                                            <LuShoppingBag size={20} className='user-actions-icon' />

                                            {
                                                cartCounter > 0 && (
                                                    <span className='user-actions-badge d-flex align-items-center justify-content-center'>
                                                        { cartCounter }
                                                    </span>
                                                )
                                            }
                                        </button>
                                    </li>

                                    <li className='nav-item dropdown'>
                                        <button className='user-actions-btn dropdown-toggle no-caret' type="button" data-bs-toggle="dropdown" >
                                            <LuUser size={22}  className='user-actions-icon'/>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end bg-forged border-gray">
                                            <li>
                                                <Link className="user-dropdown-item d-flex flex-column gap-2 align-items-center" href="#">
                                                    <LuCircleUser size={38} /> 
                                                    Hello, {user?.name.split(' ')[0]}
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className="dropdown-item" href="#">My Account</Link>
                                            </li>

                                            <li>
                                                <Link className="dropdown-item" href="#">Settings</Link>
                                            </li>

                                            <li>
                                                <button type='button' className="dropdown-item logout-dropdown-item d-flex align-items-center justify-content-between" href="#" onClick={logout}>
                                                    Logout 
                                                    <LuDoorOpen />
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) : (
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0 gap-4'>
                                    <li className='nav-item'>
                                        <Link to={`/register`} className='btn btn-primary'>Register</Link>
                                    </li>

                                    <li className='nav-item'>
                                        <Link to={`login`} className='btn btn-secondary'>Login</Link>
                                    </li>
                                </ul>
                            )
                        }

                        <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                        <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    )
}

export default Navbar
