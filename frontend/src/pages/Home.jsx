import React from 'react'
import MetaHelper from '../components/MetaHelper'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Collections from '../components/Collections'
import Heritage from '../components/Heritage'
import Trustbar from '../components/Trustbar'


function Home() {
    return (
        <>
            <MetaHelper 
                title="Home" 
                description="Discover our exclusive Summer Collection of tailored suits and Egyptian cotton shirts." 
            />
            
            <Hero />
            <FeaturedProducts />
            <Collections />
            <Heritage />
            <Trustbar />
        </>
    )
}

export default Home
