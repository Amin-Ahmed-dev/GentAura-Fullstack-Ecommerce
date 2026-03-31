import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ProductCard from './ProductCard';
import cardImg from '../assets/header.jpeg'
import ProductSkeleton from './ProductSkeleton';

function FeaturedProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    // Fetch All Products
    const fetchProducts = async () => {        
        try {
            const response = await axios.get('http://localhost:5000/api/products')
            setProducts(response.data.slice(0, 3))
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching products: ", error)
            setIsLoading(false)
        }
    }

    // UseEffect Fetching Products
    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <>
            {/* Featured Products Section */}
            <section className="featured-products py-5">
                <div className="container py-5">
                    {/* Section Header */}
                    <div className="section-header text-center">
                        <span className="section-eyebrow">Exclusives</span>
                        <h3 className="section-title">Featured Arrivals</h3>
                    </div>

                    {/* Products Grid */}
                    <div className='row gx-5'>
                        {
                            !isLoading ? (
                                products.map((product) => {
                                    const imagesArray = JSON.parse(product.images)

                                    return (
                                        <ProductCard 
                                            key={product.id}
                                            id={product.id}
                                            image={imagesArray[0]}
                                            title={product.name}
                                            category={product.category}
                                            price={product.price}
                                        />
                                    )
                                })
                            ) : (
                                [...Array(3)].map((_, index) => <ProductSkeleton key={index} />)
                            )
                        }
                    </div>
                    

                    <div className='text-center mt-5'>
                        <Link to='/shop' className='btn btn-secondary'>View Full Collection</Link>
                    </div>
                </div>
            </section>
            {/* End Featured Products */}
        </>
    )
}

export default FeaturedProducts
