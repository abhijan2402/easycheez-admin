import React from 'react'
import {Link} from 'react-router-dom'

import './ComissionMainPage.css'
import Button from '@mui/material/Button';
import home from '../../assest/home.png';
import shop from '../../assest/shop.png';

const ComissionMainPage = () => {
  return (
    <>
      <div className="comission_container">
        <div className="admin_bar">
          <div className="home_icon"><img src={home} alt="" /></div>
          <p className="admin_page">Admin Page</p>
        </div>
        <div className="comission_content">
          <div className="shop_image"><img src={shop} alt="" /></div>
          <div className="buttons">
            <Link to="/ComissionList" className='btn_link'><Button variant="contained" className='btn' style={{fontSize:"25px",backgroundColor:"#005B8F"}}>Comission List</Button></Link>
            <Link to='/Subscriber' className='btn_link'><Button variant="contained" className='btn' style={{fontSize:"25px", backgroundColor:"#005B8F"}}>Subscriber List</Button></Link>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ComissionMainPage;