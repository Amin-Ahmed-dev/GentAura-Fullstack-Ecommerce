import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/heritage.jpg'

function Heritage() {
    return (
        <>
            {/* Heritage Section */}
            <section className="heritage-section py-5 my-5">
                <div className="container py-5 my-5">
                    <div className="row align-items-center gx-lg-5">
                        <div className="col-lg-6 mb-5 p-5 mb-lg-0 p-lg-0 pe-lg-4">
                            <div className="heritage-img-wrapper">
                                <img src={img} alt="" className="heritage-img img-fluid w-100" />

                                <div className="heritage-badge">
                                    <span className='badge-subtitle'>Established</span>
                                    <span className='badge-title'>2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 ps-lg-5">
                            <span className="hero-eyebrow">Our Heritage</span>
                            <h3 className="heritage-title">The Art of <br /> <span className='heritage-title-span fst-italic'>Tailoring</span></h3>
                            <p className="heritage-desc mb-4">True luxury is found in the meticulous details. At GentAura, we combine generations of masterful craftsmanship with the world's finest fabrics, including 100% premium Egyptian Cotton.</p>
                            <p className="heritage-desc mb-5">Every stitch, every cut, and every fold is executed with precision to ensure a flawless silhouette. We don't just make clothes; we engineer confidence for the modern gentleman.</p>
                            <Link className="btn btn-secondary">Discover Our Story</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Heritage Section */}
        </>
    )
}

export default Heritage
