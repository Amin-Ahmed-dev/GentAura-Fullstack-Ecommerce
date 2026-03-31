import React from 'react'

function PageHeader({ PageTitle }) {
    return (
        <>
            {/* Page Header */}
            <div className="page-header text-center">
                <div className='page-header-overlay d-flex align-items-center justify-content-center'>
                    <div className='container'>
                        <h2 className='section-title'>{ PageTitle }</h2>
                    </div>
                </div>
            </div>
            {/* End Page Header */}
        </>
    )
}

export default PageHeader
