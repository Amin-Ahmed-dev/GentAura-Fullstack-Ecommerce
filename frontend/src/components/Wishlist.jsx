import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { LuShoppingBag, LuX, LuTrash2, LuBox, LuShoppingBasket} from "react-icons/lu";
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';


function Wishlist({ isOpen,  onClose }) {
    const { wishlist, wishlistCounter }  = useContext(WishlistContext)
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
                    <h3 className='panel-title'>Wishlist ({ wishlistCounter })</h3>

                    <button 
                        className='remove-btn'
                        onClick={onClose}
                    ><LuX size={32} /></button>
                </div>

                {
                    wishlist.length === 0 || !isLoggedIn ? (
                        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                            <p className='empty-panel-msg d-flex flex-column align-items-center gap-4'><LuShoppingBag size={32} /> Your wishlist is empty!</p>
                        </div>
                    ) : (
                        <div className='panel-items'>
                            {
                                wishlist.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className='panel-item d-flex gap-4 mb-4 pb-4'>
                                        <img src={item.image} alt={item.title} className='panel-img'/>

                                        <div className='flex-fill'>
                                            <h4 className='panel-item-title text-truncate'>{item.title}</h4>
                                            <p className='panel-item-price'>{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Wishlist
