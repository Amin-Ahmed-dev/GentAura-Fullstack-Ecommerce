import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { LuShoppingBag, LuX, LuTrash2, LuBox, LuShoppingBasket} from "react-icons/lu";
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';


function MiniCart({ isOpen,  onClose }) {
    const { cart, removeFromCart, cartCounter, cartTotalPrice  }  = useContext(CartContext)

    const { isLoggedIn } = useContext(AuthContext);

     useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Format Price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(price);
    }

    return (
        <>
            <div className={`panel-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

            <div className={`luxury-panel ${isOpen ? 'open' : ''}`}>
                <div className="panel-header d-flex align-items-center justify-content-between">
                    <h3 className='panel-title'>Shopping Bag ({ cartCounter })</h3>

                    <button 
                        className='remove-btn'
                        onClick={onClose}
                    ><LuX size={32} /></button>
                </div>

                {
                    cart.length === 0 || !isLoggedIn ? (
                        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                            <p className='empty-panel-msg d-flex flex-column align-items-center gap-4'><LuShoppingBag size={32} /> Your bag is empty!</p>
                        </div>
                    ) : (
                        <div className='panel-items'>
                            {
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className='panel-item d-flex gap-4 mb-4 pb-4'>
                                        <img src={item.image} alt={item.title} className='panel-img'/>

                                        <div className='flex-fill'>
                                            <h4 className='panel-item-title text-truncate'>{item.title}</h4>
                                            <p className='panel-item-meta'>Size: {item.size} | Qty: {item.quantity}</p>
                                            <p className='panel-item-price'>{formatPrice(item.price * item.quantity)}</p>
                                        </div>

                                        <button 
                                            className='remove-btn align-self-start'
                                            onClick={() => removeFromCart(item.id, item.size)}
                                        >
                                            <LuTrash2 size={24} />
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                

                <div className='panel-footer mt-auto'>
                    <div className='footer-top d-flex justify-content-between align-items-center mb-4 panel-footer-top'>
                        <p>Subtotal</p>
                        <p className='fw-bold'>{formatPrice(cartTotalPrice)}</p>
                    </div>
                   
                    <div className='d-flex flex-column gap-3'>
                        <Link to={`/cart`} className='btn btn-secondary' onClick={onClose}>
                            View Full Bag
                        </Link>

                        <Link className='btn btn-primary'>
                            Checkout Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniCart
