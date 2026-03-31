import React from 'react'
import { Link } from 'react-router-dom'
import suitsCategory from '../assets/suits-category.jpg'
import shirtsCategory from '../assets/shirts-category.jpg'
import accCategory from '../assets/acc-category2.jpg'


function Collections() {
    return (
        <>
            {/* Collections Section */}
            <section className="collections-section py-5">
                <div className="container py-5">
                    {/* Section Header */}
                    <div className="section-header text-center">
                        <span className="section-eyebrow">Curated For You</span>
                        <h3 className="section-title">Signature Collections</h3>
                    </div>

                    <div className="row gx-5">
                        {/* Suits Category */}
                        <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <Link className="collection-card">
                                <img src={suitsCategory} alt="" className="collection-img" />

                                <div className="collection-overlay text-center d-flex flex-column align-items-center">
                                    <h4 className="collection-title">Tailored Suits</h4>
                                    <span className="collection-link">Discover</span>
                                </div>
                            </Link>
                        </div>

                        {/* Shirts Category */}
                        <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <Link className="collection-card">
                                <img src={shirtsCategory} alt="" className="collection-img" />

                                <div className="collection-overlay text-center d-flex flex-column align-items-center">
                                    <h4 className="collection-title">Egyptian Cotton</h4>
                                    <span className="collection-link">Discover</span>
                                </div>
                            </Link>
                        </div>

                        {/* Accessories Category */}
                        <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <Link className="collection-card">
                                <img src={accCategory} alt="" className="collection-img" />

                                <div className="collection-overlay text-center d-flex flex-column align-items-center">
                                    <h4 className="collection-title">Leather Goods</h4>
                                    <span className="collection-link">Discover</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Collections Section */}
        </>
    )
}

export default Collections
