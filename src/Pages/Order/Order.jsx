import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ContextData } from '../../App';
import './Order.css'
import home from '../../assest/home.png';
import OrderCard from '../../Components/OrderCard/OrderCard'
import { Link } from 'react-router-dom';

const Order = () => {
  const { userUid, getAutherUserDetails } = useContext(ContextData);
  const [orderDetail, setOrderDetail] = useState([]);
  const [TotalOrderLength, setTotalOrderLength] = useState('')
  useEffect(() => {
    getOrderData();
  }, [])

  const getOrderData = () => {
    let resultArray = [];
    // let conditinoOne = where("UserUid", "==", userUid);
    const baseQuery = query(collection(db, "OrderPage"));
    getDocs(baseQuery).then((res) => {
      res.forEach((item) => {
        resultArray.push({ id: item.id, ...item.data() });
      })
      let len = resultArray
      setTotalOrderLength(len.length)
      // console.log(TotalOrderLength, "length")
      setOrderDetail(resultArray)
      // console.log(orderDetail)
    })
  }
  return (
    <>
      <div className="order_container">
        <div className="order_bar">
          {/* <div className="order_home_icon"><img src={home} alt="" /></div> */}
          <div className="order_list_page">
            <Link to='/ComissionList' style={{ textDecoration: "none" }}><p>Comission</p></Link>
            <Link to='/Subscriber' style={{ textDecoration: "none" }}><p>Subscribers</p></Link>

          </div>
        </div>

        <div className="order_review">
          <h1>Order Review page</h1>
          <div className="order_store_total">
            <p>Stores : 100</p>
            <span className='TODiv'>

              <p className='TotOrderButton' style={{ color: "white" }}>Total Orders : {TotalOrderLength}</p>
            </span>
          </div>
          <div className="order">
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Order