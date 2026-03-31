import React, { createContext, useState, useEffect } from "react";
import { showToast, confirmAction } from '../utils/alertService';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    // Cart State
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('gentaura_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // Cart LocalStrorage
    useEffect(() => {
        localStorage.setItem('gentaura_cart', JSON.stringify(cart))
    }, [cart])

    // Add to cart
    const addToCart = (product, selectedSize) => {
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

    // Cart Counter Calculation
    const cartCounter = cart.reduce((total, item) => total + item.quantity, 0)

    // Cart Total Price Calculation
    const cartTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

    
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