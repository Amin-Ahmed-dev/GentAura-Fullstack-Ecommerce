import React, { useState, useEffect, useContext } from 'react'
import MetaHelper from '../components/MetaHelper';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'
import { LuShoppingBag, LuHeart, LuRotateCcw, LuShieldCheck } from "react-icons/lu";
import PageHeader from '../components/PageHeader'
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import { confirmAction, showError } from '../utils/alertService';

function ProductDetails() {
    const navigate = useNavigate();
    const params = useParams()
    const id = params.id
    
    const [product, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState('')
    const [mainImage, setMainImage] = useState('')

    const { addToCart } = useContext(CartContext)
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isFavorite = isInWishlist(Number(id));

    const { isLoggedIn } = useContext(AuthContext)

    
    // Fetch Single Product
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`)
            let data = response.data

            data.images = JSON.parse(data.images)
            data.sizes = JSON.parse(data.sizes)

            setProducts(data)
            setMainImage(data.images[0])
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching product: ", error)
            setIsLoading(false)
        }
    }

    // UseEffect Fetching Single Product
    useEffect(() => {
        fetchProduct()
    }, [id])

    // Format Price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(price);
    }

    if (isLoading || !product) {
        return (
            <>
            <MetaHelper 
                title={"Loading..."} 
                description={"View product details."}
            />
                <PageHeader PageTitle={`Loading...`} />

                <ProductDetailsSkeleton />
            </>
        )
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

        if (!selectedSize) {
            showError("Selection Required", "Please select a size first.");
            return;
        }

        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.images[0]
        }

        addToCart(cartItem, selectedSize)
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
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.images[0]
        }

        toggleWishlist(wishlistItem)
    }

    return (
        <>
            <MetaHelper 
                title={product.name}
                description={product.description}
            />

            <PageHeader PageTitle={product.name} />

            {/* Product Details Section */}
            <section className='product-details-section py-5'>
                <div className='container py-5'>
                    <div className='row gx-lg-5'>
                        <div className='col-lg-7 mb-5 mb-lg-0'>
                            <div className="mb-3">
                                <img src={mainImage} alt={product.name} className="main-detail-img img-fluid w-100 rounded" />
                            </div>

                        
                            <div className="d-flex gap-3 overflow-auto pb-2">
                                {product.images.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img} 
                                        className={`thumb-img ${mainImage === img ? 'active' : ''}`}
                                        onClick={() => setMainImage(img)}
                                        alt="thumbnail"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='col-lg-5'>
                            <span className='product-category rounded-pill' style={{margin: '0 0 2rem 0'}}>{product.category}</span>

                            <h2 className='product-title'  style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>{product.name}</h2>
                            <p className='product-price' style={{fontSize: '2.5rem'}}>{formatPrice(product.price)}</p>
                            <p className='product-desc'>{product.description}</p>

                            <div style={{marginBottom: '5rem'}}>
                                <label className="form-label text-white mb-3" style={{ letterSpacing: '2px' }}>SELECT SIZE</label>
                                <div className="d-flex gap-2 flex-wrap">
                                    {product.sizes.map((size) => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='mt-5 d-flex flex-column gap-4'>
                                <div className='d-flex gap-4'>
                                    <button 
                                        className='btn btn-secondary d-flex align-items-center justify-content-center gap-3 flex-fill py-4' 
                                        onClick={handleAddToCart}
                                    >
                                        <LuShoppingBag size={20} /> <span>Add to bag</span>
                                    </button>

                                    <button 
                                        className={`btn btn-secondary wishlist-btn ${isFavorite && isLoggedIn ? 'active' : ''}`}
                                        onClick={() => handleAddToWishlist()}
                                        title="Add to Wishlist"
                                    >
                                        <LuHeart size={20} />
                                    </button>
                                </div>

                                <button className='btn btn-primary d-flex align-items-center justify-content-center d-flex align-items-center justify-content-center gap-3 py-4'>
                                    <LuShoppingBag size={20} /> <span>Buy Now</span>
                                </button>
                            </div>

                            
                            <ul className='pt-5 mt-5' style={{ borderTop: '1px solid var(--border-gray)', color: 'var(--silver-dark)' }}>
                                <li className="d-flex align-items-center gap-3 mb-4">
                                    <LuRotateCcw size={18} /> <span>30-Day Complimentary Returns</span>
                                </li>

                                <li className="d-flex align-items-center gap-3">
                                    <LuShieldCheck size={18} /> <span>Authentic Gentaura Craftsmanship</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Product Details Section */}
        </>
    )
}

export default ProductDetails
