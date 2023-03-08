import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import './ComissionMainPage.css'
import Button from '@mui/material/Button';
import home from '../../assest/home.png';
import shop from '../../assest/shop.png';

const ComissionMainPage = () => {
  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("logOut")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <>
      <div className="comission_container">
        <div className="admin_bar">
          {/* <div className="home_icon"><img src={home} alt="" /></div> */}
          <p className="admin_page">Admin Page</p>
        </div>
        <div className="comission_content">
          <div className="shop_image"><img src={shop} alt="" /></div>
          <div className="buttons">
            <Link to="/ComissionList" className='btn_link'><Button variant="contained" className='btn' style={{ fontSize: "16px", backgroundColor: "#005B8F" }}>Comission List</Button></Link>
            <Link to='/Subscriber' className='btn_link'><Button variant="contained" className='btn' style={{ fontSize: "16px", backgroundColor: "#005B8F" }}>Subscriber List</Button></Link>
            <Link to='/Order' className='btn_link'><Button variant="contained" className='btn' style={{ fontSize: "16px", backgroundColor: "#005B8F" }}>Order Review</Button></Link>
            <Link className='btn_link'><Button onClick={logOut} variant="contained" className='btn' style={{ fontSize: "16px", backgroundColor: "#005B8F" }}>LogOut</Button></Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default ComissionMainPage;