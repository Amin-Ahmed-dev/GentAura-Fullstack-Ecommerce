import React from 'react'
import { Link } from 'react-router-dom'
import heroImg1 from '../assets/hero.png'
import heroImg2 from '../assets/hero2.png'
import heroImg3 from '../assets/hero3.png'


function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className='hero-section position-relative'>
                <div className='container h-100'>
                    {/* Carousel Indicators */}
                    <div id="carouselExampleIndicators" className="carousel slide h-100 position-relative" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        <div className='carousel-inner h-100 z-1'>
                            {/* Carousel Item 1 */}
                            <div className="carousel-item h-100 active">
                                <div className="row h-100 justify-content-between hero-section-container">
                                    <div className="col-lg-6 d-flex flex-column align-items-center align-items-lg-start align-self-center text-center text-lg-start hero-content-container">
                                        <span className='hero-eyebrow'>Summer Collection</span>
                                        <h2 className="hero-title">Elevate your style, redefine your confidence</h2>
                                        <p className='hero-desc'>Discover timeless pieces crafted for comfort and elegance. Perfect for those who dare to stand out and embrace the season with confidence.</p>
                                        
                                        <div className="hero-btns d-flex gap-4">
                                            <Link to='' className="btn btn-primary">Shop Now</Link>
                                            <Link to='' className="btn btn-secondary">Explore More</Link>
                                        </div>
                                    </div>

                                    <div className="col-lg-5 d-lg-flex d-none align-items-center justify-content-center position-relative h-100 hero-img-container">
                                        <img src={heroImg1} alt="" className="position-relative h-100 " />
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Item 2 */}
                            <div className="carousel-item h-100">
                                <div className="row h-100 justify-content-between hero-section-container">
                                    <div className="col-lg-6 d-flex flex-column align-items-center align-items-lg-start align-self-center text-center text-lg-start hero-content-container">
                                        <span className='hero-eyebrow'>Eco-Friendly Fashion</span>
                                        <h2 className="hero-title">Sustain your future, refine your legacy</h2>
                                        <p className='hero-desc'>Our sustainable collection blends modern design with eco-conscious fabrics. Fashion that looks good on you—and feels good for the world.</p>
                                        
                                        <div className="hero-btns d-flex gap-4">
                                            <Link to='' className="btn btn-primary">Shop Green</Link>
                                            <Link to='' className="btn btn-secondary">Explore More</Link>
                                        </div>
                                    </div>

                                    <div className="col-lg-5 d-lg-flex d-none align-items-center justify-content-center position-relative h-100 hero-img-container">
                                        <img src={heroImg2} alt="" className="position-relative h-100 " />
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Item 3 */}
                            <div className="carousel-item h-100">
                                <div className="row h-100 hero-section-container">
                                    <div className="col-lg-7 d-flex flex-column align-items-center align-items-lg-start align-self-center text-center text-lg-start hero-content-container">
                                        <span className='hero-eyebrow'>New Arrivals</span>
                                        <h2 className="hero-title">Ignite your presence, command your expression</h2>
                                        <p className='hero-desc'>Be the first to explore our boldest designs yet. Curated to make statements, break limits, and inspire confidence in every step you take.</p>
                                        
                                        <div className="hero-btns d-flex gap-4">
                                            <Link to='' className="btn btn-primary">Discover Now</Link>
                                            <Link to='' className="btn btn-secondary">See Collection</Link>
                                        </div>
                                    </div>

                                    <div className="col-lg-5 d-lg-flex d-none align-items-center justify-content-center position-relative h-100 hero-img-container">
                                        <img src={heroImg3} alt="" className="position-relative h-100 " />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            {/* <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span> --> */}
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            {/* <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> --> */}
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className='hero-overlay'></div>
            </section>
            
            {/* End Hero Section */}
        </>
    )
}

export default Hero
