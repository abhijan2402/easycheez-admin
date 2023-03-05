import React from 'react'

import './Subscriber.css'
import home from '../../assest/home.png';

const Subscriber = () => {
  return (
    <>
        <div className="subscriber_container">
            <div className="subscriber_bar">
                <div className="subscriber_home_icon"><img src={home} alt="" /></div>
                <div className="subscriber_page">
                    <p>Comission</p>
                    <p className='active'>Subscriber</p>
                </div>
            </div>

        </div>
    </>
  )
}

export default Subscriber