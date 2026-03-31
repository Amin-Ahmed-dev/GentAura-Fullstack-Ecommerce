import React, { useState, useEffect } from 'react';
import MetaHelper from '../components/MetaHelper';
import axios from 'axios';
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard';
import ShopFilters from '../components/ShopFilters';
import ProductSkeleton from '../components/ProductSkeleton';

function Shop() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const categories = ["All", "Suits", "Shirts", "Shoes", "Accessories"];

    // Fetch All Products
    const fetchProducts = async () => {        
        try {
            const response = await axios.get('http://localhost:5000/api/products')
            setProducts(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching products: ", error)
            setIsLoading(false)
        }
    }

    // UseEffect Fetching Products
    useEffect(() => {
        fetchProducts()
        window.scrollTo(0, 0)
    }, [])

    // Filter Engine
    useEffect(() => {
        let result = [...products];

        if (activeCategory !== "All") {
            result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }

        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (sortBy === "low") result.sort((a, b) => a.price - b.price);
        if (sortBy === "high") result.sort((a, b) => b.price - a.price);

        setFilteredProducts(result);
    }, [searchQuery, activeCategory, sortBy, products]);

    
    return (
        <>
            <MetaHelper 
                title="Shop Our Collection" 
                description="Browse the GentAura catalog: from premium Italian wool suits to handcrafted Egyptian cotton shirts and luxury leather accessories." 
            />

            <PageHeader PageTitle={`Our Shop`} />

            {/* Shop Section */}
            <section className='shop-section py-5'>
                <div className='products-grid-container container py-5'>
                    <ShopFilters 
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
                        sortBy={sortBy} setSortBy={setSortBy}
                        categories={categories}
                    />

                    <div className='row gx-5'>
                        {
                            !isLoading ? (
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => {
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
                                    <div className="text-center py-5 w-100">
                                        <h3 className="text-silver">No sartorial pieces found.</h3>
                                    </div>
                                )
                            ) : (
                                [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                            )
                        }
                    </div>
                    
                </div>
            </section>
            {/* End Shop Section */}
        </>
    )
}

export default Shop
