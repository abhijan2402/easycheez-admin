import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
import { useLocation } from 'react-router-dom';
import { getOrderStatusWise } from '../../services/getOrderStatusWise';
import StoreOrdeeCard from './StoreOrdeeCard';
function ActiveOrderCard() {
    const location=useLocation();
    const [activeOrders, setActiveOrders] = useState([])
    useEffect(()=>{
        getOrders()
    },[])
    async function getOrders(){
        let response=await getOrderStatusWise("In progress",location.state.item.id);
        if(response.error){
            alert("Something went wrong!");
            return;
        }
        setActiveOrders(response.data)
    }
    return (
        <>
            <div style={{ width: "100%", textAlign: "center" }}>
                <h1>Active Order of Store Name</h1>
            </div>
            <div className="order_card_container" style={{ margin: "auto", width: 'auto', width: "80%" }}>
                <div className="order_card">
                    <div className="order_card_img">
                        <img src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png" alt="store" />
                    </div>
                    <div className="order_card_details">
                        <h3>{location.state.item.shopName}</h3>
                        <div className="order_details">
                            <p>Total Active Order : {activeOrders.length.length===0?0:activeOrders.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{marginLeft:150}}>Orders</h2>
            <div className='orders-container'>
                {   
                    activeOrders.length===0?<h3 style={{fontSize:20,marginLeft:150}}>No complete Order</h3>:
                    activeOrders.map((item,index)=>(
                        <StoreOrdeeCard key={index} storeData={location.state.item} ordereData={item} />
                    ))
                }
            </div>
        </>
    )
}

export default ActiveOrderCard