import React from 'react'

import './Order.css'
import home from '../../assest/home.png';
import OrderCard from '../../Components/OrderCard/OrderCard'
import { Link } from 'react-router-dom';

const Order = () => {
  return (
    <>
       <div className="order_container">
            <div className="order_bar">
                <div className="order_home_icon"><img src={home} alt="" /></div>
                <div className="order_list_page">
                <Link to='/ComissionList' style={{textDecoration:"none"}}><p>Comission</p></Link>
                <Link to='/Subscriber' style={{textDecoration:"none"}}><p>Subscribers</p></Link>
                    
                </div>
            </div>

            <div className="order_review">
              <h1>Order Review page</h1>
              <div className="order_store_total">
                <p>Stores : 100</p>
                <p>Total Orders : 4966</p>
              
              </div>
              <div className="order">
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Order