import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LuEye, LuSearch, LuShare2, LuHeart } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { confirmAction } from '../utils/alertService';


function ProductCard({ id, image, title, category, price }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isFavorite = isInWishlist(id);

    // Format Price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(price);
    }

    // Handle Add To Cart
    const handleAddToCart = async () => {        
        if (!isLoggedIn) {
            const isConfirmed = await confirmAction("Login", "Please Login to add items to your bag")

            if (isConfirmed) {
                window.scrollTo(0, 0)
                navigate('/login')
            }

            return
        }

        const cartItem = { 
            id, 
            image, 
            title, 
            price, 
            category 
        }

        addToCart(cartItem, "One Size")
    }

    // Handle Add To Wishlist
    const handleAddToWishlist = async () => {
        if (!isLoggedIn) {
            const isConfirmed = await confirmAction("Login", "Please Login to add items to your wishlist")

            if (isConfirmed) {
                window.scrollTo(0, 0)
                navigate('/login')
            }
            
            return
        }

        const wishlistItem = { 
            id, 
            image, 
            title, 
            category, 
            price 
        }

        toggleWishlist(wishlistItem)
    }

    return (
        <>
            {/* Product Card */}
            <div className="col-md-6 col-lg-4 mb-5">
                <div className="product-card card h-100">
                    {/* Product Image Wrapper */}
                    <div className="product-img-wrapper">
                        <img src={image} alt={title} className='product-img' />

                        <button 
                            className={`product-wishlist-btn wishlist-btn ${isFavorite && isLoggedIn ? 'active' : ''}`}
                            onClick={() => handleAddToWishlist()}
                            title="Add to Wishlist"
                        >
                            <LuHeart size={24} />
                        </button>

                        <ul className='product-icons'>
                            <li>
                                <Link to={`/shop/${id}`} className='product-icon'>
                                    <LuEye size={32} />
                                </Link>
                            </li>

                            <li>
                                <Link className='product-icon'>
                                    <LuSearch size={32} />
                                </Link>
                            </li>

                            <li>
                                <Link className='product-icon'>
                                    <LuShare2 size={32} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Product Details */}
                    <div className="product-details card-body">
                        <h4 className='product-title text-truncate'>{title}</h4>
                        <span className='product-category rounded-pill'>{category}</span>
                        
                        <div className='product-footer d-flex justify-content-between align-items-end'>
                            <ul className=''>
                                <li className='product-price-title '>Price</li>
                                <li className='product-price'>{formatPrice(price)}</li>
                            </ul>

                            <button 
                                className='btn btn-primary'
                                onClick={() => handleAddToCart()}
                            > 
                                Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Product Card */}
        </>
    )
}

export default ProductCard
