import React from 'react'

function ProductSkeleton() {
    return (
        <>
            {/* Product Card Skeleton */}
            <div className="col-md-6 col-lg-4 mb-5">
                <div className="product-card card h-100 border-0 bg-transparent">
                    <div className="product-img-wrapper shimmer"></div>

                    <div className="product-details card-body d-flex flex-column">
                        <div className="product-title shimmer mb-2" style={{ height: '2.4rem', width: '80%' }}></div>
                        <div className="product-category border-0 shimmer rounded-pill" style={{ height: '2.5rem', width: '50%' }}></div>
                        
                        <div className="product-footer d-flex justify-content-between align-items-end mt-auto pt-5">
                            <div className='d-flex flex-column'>
                                <div className="shimmer mb-2" style={{ height: '1.7rem', width: '50px' }}></div>
                                <div className="shimmer" style={{ height: '2.5rem', width: '90px' }}></div>
                            </div>

                            <div className="shimmer rounded" style={{ height: '5rem', width: '130px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product Card Skeleton */}
        </>
    )
}

export default ProductSkeleton
