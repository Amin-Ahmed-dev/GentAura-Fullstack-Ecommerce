import React from 'react'

function ProductDetailsSkeleton() {
    return (
        <>
            {/* Product Details Skeleton */}
            <section>
                <div className="container py-5 mt-5">
                    <div className="row gx-lg-5">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="shimmer rounded w-100 mb-3" style={{aspectRatio: "1 / 1" }}></div>

                            <div className='d-flex gap-4'>
                                <div className='shimmer' style={{width: '120px', aspectRatio: '1 / 1', borderRadius: '4px'}}></div>
                                <div className='shimmer' style={{width: '120px', aspectRatio: '1 / 1', borderRadius: '4px'}}></div>
                            </div>
                        </div>


                        <div className="col-lg-5">
                            <div className="shimmer rounded-pill mb-4" style={{ width: "170px", height: "2.5rem" }}></div>
                            
                            <div className="shimmer mb-5 rounded" style={{ width: "90%", height: "4rem" }}></div>
                            
                            <div className="shimmer mb-5 rounded" style={{ width: "190px", height: "3rem" }}></div>
                            
                            <div className="shimmer mb-2 rounded" style={{ width: "100%", height: "2rem" }}></div>
                            <div className="shimmer mb-2 rounded" style={{ width: "95%", height: "2rem" }}></div>
                            <div className="shimmer mb-5 rounded" style={{ width: "80%", height: "2rem" }}></div>
                            
                            <div style={{marginBottom: '5rem'}}>
                                <div className='shimmer rounded mb-3' style={{width: '120px', height: '2.5rem'}}></div>

                                <div className='d-flex gap-2'>
                                    <div className='shimmer' style={{ width: '60px', height: '4.7rem' }}></div>
                                    <div className='shimmer' style={{ width: '60px', height: '4.7rem' }}></div>
                                    <div className='shimmer' style={{ width: '60px', height: '4.7rem' }}></div>
                                </div>
                            </div>

                            <div className='d-flex flex-column gap-4'>
                                <div className='d-flex align-items-center gap-4'>
                                    <div className="shimmer rounded flex-fill" style={{ height: "5rem" }}></div>
                                    <div className="shimmer rounded" style={{ width: '60px', height: "5rem" }}></div>
                                </div>

                                <div className='shimmer rounded' style={{ height: '5rem' }}></div>
                            </div>

                            <ul className='mt-5 pt-5' style={{ borderTop: '1px solid var(--border-gray)' }}>
                                <li className='shimmer rounded mb-4' style={{ width: '60%', height: '2rem' }}></li>
                                <li className='shimmer rounded' style={{ width: '60%', height: '2rem' }}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Product Details Skeleton */}
        </>
    )
}

export default ProductDetailsSkeleton
