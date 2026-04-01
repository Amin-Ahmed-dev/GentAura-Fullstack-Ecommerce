import React, { createContext, useState, useEffect, useContext } from 'react';
import { showToast } from '../utils/alertService';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);

    // A User-Specific Key
    const wishlistKey = user ? `gentaura_wishlist_${user.id}` : null

    // Wishlist LocalStorage
    useEffect(() => {
        if (isLoggedIn && wishlistKey) {
            const savedData = localStorage.getItem(wishlistKey);
            setWishlist(savedData ? JSON.parse(savedData) : []);
        } else {
            setWishlist([]);
        }
    }, [isLoggedIn, wishlistKey]);

    // Save Wishlist Data
    useEffect(() => {
        if (isLoggedIn && wishlistKey) {
            localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        }
    }, [wishlist, isLoggedIn, wishlistKey]);

    // Toggle Wishlist
    const toggleWishlist = (product) => {
        if (!isLoggedIn) return;

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
        if (!isLoggedIn) return false;

        return wishlist.some(item => item.id === productId);
    };

    // Wishlist Counter
    const wishlistCounter = isLoggedIn ? wishlist.length : 0;

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