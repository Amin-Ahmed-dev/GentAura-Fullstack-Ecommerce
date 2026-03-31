import React, { createContext, useState, useEffect } from 'react';
import { showToast } from '../utils/alertService';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    // Wishlist State
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('gentaura_wishlist')
        return savedWishlist ? JSON.parse(savedWishlist) : []
    })

    // Wishlist LocalStorage
    useEffect(() => {
        localStorage.setItem('gentaura_wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    // Toggle Wishlist
    const toggleWishlist = (product) => {
        const existingItem = wishlist.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedWishlist = wishlist.filter((item) => item.id !== product.id)
            
            setWishlist(updatedWishlist)
            showToast("Removed from wishlist", "info")
        } else {
            setWishlist([...wishlist, product])
            showToast("Saved to favorites");
        }
    };

    // Check if item is in wishlist 
    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    // Wishlsit Counter
    const wishlistCounter = wishlist.length;

    return (
        <WishlistContext.Provider 
            value={{ 
                wishlist, 
                toggleWishlist, 
                isInWishlist, 
                wishlistCounter
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};