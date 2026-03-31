import React, { useContext } from 'react'
import MetaHelper from '../components/MetaHelper';
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import { showToast } from '../utils/alertService';
import { Link } from 'react-router-dom'
import { LuTrash2, LuPlus, LuMinus, LuShoppingBag, LuHeart } from "react-icons/lu"
import PageHeader from '../components/PageHeader'


const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotalPrice, cartCounter } = useContext(CartContext);

    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const { isLoggedIn } = useContext(AuthContext);

    if (cart.length === 0 || !isLoggedIn) {
        return (
            <>
                <MetaHelper title="Your Shopping Bag" />

                <PageHeader PageTitle="Your Bag" />

                <div className="text-center py-5 my-5">
                    <LuShoppingBag size={64} className="empty-cart-icon mb-4" />
                    <h2 className="mb-5">Your bag is currently empty.</h2>

                    <Link to="/shop" className="btn btn-primary">RETURN TO SHOP</Link>
                </div>
            </>
        )
    }

    // Format Price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(price);
    }

    // Handle Add To Wishlist
    const handleAddToWishlist = (id, image, title, category, price) => {
        if (!isLoggedIn) {
            showToast("Please Login to add items to your wishlist", "info")
            
            navigate('/login')
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
            <MetaHelper title="Your Shopping Bag" />

            <PageHeader PageTitle="Your Bag" />
            
            {/* Main Cart Section */}
            <section className='main-cart-section py-5'>
                <div className='container py-5'>
                    <div className='row gx-5'>
                        <div className='col-lg-8'>
                            {
                                cart.map((item) => {
                                    const isFavorite = isInWishlist(item.id)

                                    return (
                                        <div key={`${item.id}-${item.size}`} className='cart-item product-card mb-5'>
                                            <div className='row g-0'>
                                                <div className='col-4 cart-img-wrapper'>
                                                    <img src={item.image} alt={item.title} className='cart-img' />
                                                </div>

                                                <div className='col-8 d-flex'>
                                                    <div className='w-100 mx-5 my-4 d-flex flex-column gap-5'>
                                                        <div>
                                                            <h3 className='cart-item-title text-truncate'>{item.title}</h3>
                                                            <span className='product-category rounded-pill'>{item.category}</span>
                                                            <p className='cart-item-size'>Size: {item.size}</p>
                                                            <p className='cart-item-price'>{formatPrice(item.price * item.quantity)}</p>
                                                        </div>

                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className="cart-item-qty-container d-flex align-items-center rounded">
                                                                <button 
                                                                    className="qty-btn d-flex align-items-center justify-content-center"
                                                                    onClick={() => updateQuantity(item.id, item.size, -1)}
                                                                >
                                                                    <LuMinus size={16} />
                                                                </button>

                                                                <p className="qty-label flex-fill text-center">{item.quantity}</p>

                                                                <button 
                                                                    className="qty-btn d-flex align-items-center justify-content-center"
                                                                    onClick={() => updateQuantity(item.id, item.size, 1)}
                                                                >
                                                                    <LuPlus size={16} />
                                                                </button>
                                                            </div>

                                                            <div className='d-flex gap-4 cart-item-actions'>
                                                                <button 
                                                                    className={` wishlist-btn ${isFavorite && isLoggedIn ? 'active' : ''}`}
                                                                    onClick={() => handleAddToWishlist(item.id, item.image, item.title, item.category, item.price)}
                                                                    title="Add to Wishlist"
                                                                >
                                                                    <LuHeart size={24} />
                                                                </button>

                                                                <button 
                                                                    className='remove-btn' 
                                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                                >
                                                                    <LuTrash2 size={24} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='col-lg-4 mt-5 mt-lg-0'>
                            <div className='cart-summary h-100'>
                                <h3 className='cart-summary-title'>Order Summary</h3>

                                <div className='cart-summary-details d-flex align-items-center justify-content-between'>
                                    <p className='text-uppercase'>Cart Items</p>
                                    <p>{cartCounter}</p>
                                </div>

                                <div className='cart-summary-details d-flex align-items-center justify-content-between'>
                                    <p className='text-uppercase'>Subtotal</p>
                                    <p>{formatPrice(cartTotalPrice)}</p>
                                </div>

                                <div className='cart-summary-details d-flex align-items-center justify-content-between'>
                                    <p className='text-uppercase'>Estimated Shipping</p>
                                    <p className='text-uppercase free-label'>Free</p>
                                </div>

                                <div className='cart-summary-details cart-summary-total d-flex align-items-center justify-content-between'>
                                    <p className='text-uppercase'>Total</p>
                                    <p>{formatPrice(cartTotalPrice)}</p>
                                </div>

                                <Link className='btn btn-primary w-100'>
                                    Proceed to Checkout
                                </Link>

                                <div className='text-center'>
                                    <Link to={`/shop`} className='shipping-link text-uppercase' >
                                        Continue Shipping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Main Cart Section */}
        </>
    )
}

export default Cart;