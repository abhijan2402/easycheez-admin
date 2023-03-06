import React from 'react'

import './PercentCard.css';
import percentcard from '../../assest/percentcard.png'

const PercentCard = () => {
  return (
    <>
        <div className="percent_card_container">
            <div className="percent_card">
                <div className="card_img">
                    <h3>Varinda Shop(Grocery Store)</h3>
                    <img src={percentcard} alt="" />
                </div>
                <div className="card_details">
                    
                    <div className="details">
                        <p>Location : Malviya Nagar, Jaipur</p>
                        <p>Contact details : +91 333 444 5555</p>
                        <p>PinCode : 303025</p>
                        <p>Subscription valid till : 9, FEB</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PercentCard