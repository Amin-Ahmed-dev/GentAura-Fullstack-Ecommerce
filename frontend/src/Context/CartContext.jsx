import React, { createContext, useState, useEffect, useContext } from "react";
import { showToast, confirmAction } from '../utils/alertService';
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    // A User-Specific Key
    const cartKey = user ? `gentaura_cart_${user.id}` : null;

    // Monitor User Changes
    useEffect(() => {
        if (isLoggedIn && cartKey) {
            const savedData = localStorage.getItem(cartKey);
            setCart(savedData ? JSON.parse(savedData) : []);
        } else {
            setCart([]);
        }
    }, [isLoggedIn, cartKey]);

    // Save Cart Data
    useEffect(() => {
        if (isLoggedIn && cartKey) {
            localStorage.setItem(cartKey, JSON.stringify(cart));
        }
    }, [cart, isLoggedIn, cartKey]);

    // Add to cart
    const addToCart = (product, selectedSize) => {
        if (!isLoggedIn) return;

        const existingItem = cart.find((item) => item.id === product.id && item.size === selectedSize)

        if (existingItem) {
            const updatedCart = cart.map((item) =>
                (item.id === product.id && item.size === selectedSize)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )

            setCart(updatedCart)
        } else {
            const newItem = { ...product, size: selectedSize, quantity: 1 }

            setCart([...cart, newItem])
        }

        showToast(`${product.title} added to bag`);
    }

    // Remove From Cart
    const removeFromCart = async (productId, size) => {
        const isConfirmed = await confirmAction("Remove Item?", "This will remove the item from your selection.");

        if (isConfirmed) {
            const filteredCart = cart.filter((item) => !(item.id === productId && item.size === size))

            setCart(filteredCart)
            showToast("Bag updated", "info");
        }    
    }

    // Update Quantity For Cart Item
    const updateQuantity = (productId, size, change) => {
        const updatedCart = cart.map((item) => {
            if (item.id === productId && item.size === size) {
                let newQuantity = item.quantity + change
                
                if (newQuantity < 1) {
                    newQuantity = 1
                }
                
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCart(updatedCart)
    }
   
    // Clear Cart
    const clearCart = () => setCart([])

    let cartCounter = 0
    let cartTotalPrice = 0

    if (isLoggedIn) {
        // Cart Counter Calculation
        cartCounter = cart.reduce((total, item) => total + item.quantity, 0)

        // Cart Total Price Calculation
        cartTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    
    return (
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCounter,
                cartTotalPrice
            }}
        >
            { children }
        </CartContext.Provider>
    )
}