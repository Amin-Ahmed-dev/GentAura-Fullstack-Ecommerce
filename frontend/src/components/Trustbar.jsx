import React from 'react'
import { LuTruck, LuScissors, LuRotateCcw, LuShieldCheck } from "react-icons/lu";

function Trustbar() {
    return (
        <>
            {/* Trust Bar */}
            <section className='trust-bar py-5'>
                <div className='container'>
                    <div className="row text-center">
                        <div className="trust-item col-6 col-md-3 mb-5">
                            <LuTruck className="trust-icon" size={32} strokeWidth={1.5} />
                            <h6 className="trust-title">Express Delivery</h6>
                            <p className="trust-desc">Complimentary over EGP 3,000</p>
                        </div>

                        <div className="trust-item col-6 col-md-3 border-start-md mb-5">
                            <LuScissors className="trust-icon" size={32} strokeWidth={1.5} />
                            <h6 className="trust-title">Master Tailoring</h6>
                            <p className="trust-desc">Expert craftsmanship in every stitch</p>
                        </div>

                        <div className="trust-item col-6 col-md-3 border-start-md mb-5">
                            <LuRotateCcw className="trust-icon" size={32} strokeWidth={1.5} />
                            <h6 className="trust-title">Complimentary Returns</h6>
                            <p className="trust-desc">30-day seamless return policy</p>
                        </div>

                        <div className="trust-item col-6 col-md-3 border-start-md mb-5">
                            <LuShieldCheck className="trust-icon" size={32} strokeWidth={1.5} />
                            <h6 className="trust-title">Secure Checkout</h6>
                            <p className="trust-desc">100% protected encrypted payments</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Trust Bar */}
        </>
    )
}

export default Trustbar
