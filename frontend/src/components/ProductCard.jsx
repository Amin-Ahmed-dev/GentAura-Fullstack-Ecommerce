import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuEye, LuSearch, LuShare2, LuHeart } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { confirmAction, showError } from '../utils/alertService';


function ProductCard({ id, image, sizes, title, category, price }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isFavorite = isInWishlist(id);

    const [selectedSize, setSelectedSize] = useState("");
    const isOneSize = sizes && sizes.length === 1;

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

        const sizeToAdd = isOneSize ? sizes[0] : selectedSize;

        if (!sizeToAdd) {
            showError("Selection Required", "Please select a size first.");
            return;
        }

        const cartItem = { 
            id, 
            image, 
            title, 
            price, 
            category 
        }

        addToCart(cartItem, sizeToAdd)
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
                        <Link to={`/shop/${id}`}>
                            <img src={image} alt={title} className='product-img' />
                        </Link>

                        <div className="size-selector-overlay">
                        <p className="size-label mb-3 text-uppercase">Select Size</p>
                        <div className="d-flex flex-wrap justify-content-center gap-2 px-3">
                            {
                                sizes?.map((size) => (
                                    <button 
                                        key={size}
                                        className={`quick-size-btn d-flex align-items-center justify-content-center ${selectedSize === size ? 'active' : ''} ${isOneSize ? 'active one-size-btn' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedSize(size);
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                        <button 
                            className={`product-wishlist-btn wishlist-btn ${isFavorite && isLoggedIn ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleAddToWishlist()
                            }}
                            title="Add to Wishlist"
                        >
                            <LuHeart size={24} />
                        </button>

                           
                    </div>

                    {/* Product Details */}
                    <div className="product-details card-body">
                        <Link to={`/shop/${id}`}>
                            <h4 className='product-title text-truncate'>{title}</h4>
                        </Link>

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
