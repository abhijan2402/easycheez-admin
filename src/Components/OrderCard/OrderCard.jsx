import React from 'react'

import './OrderCard.css'
import orderImage from '../../assest/order.png'

const OrderCard = () => {
  return (
    <>
         <div className="order_card_container">
            <div className="order_card">
                <div className="order_card_img">
                    <img src={orderImage} alt="" />
                </div>
                <div className="order_card_details">
                    <h3>Varinda Store</h3>
                    <div className="order_details">
                        <p>Total Order : 945</p>
                        <p>Comission Set : 10%</p>
                        <p>Commission Details : 975846555</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderCard