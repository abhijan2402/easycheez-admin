import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
import { Link, useLocation } from "react-router-dom";
import { getOrderStatusWise } from '../../services/getOrderStatusWise';
import StoreOrdeeCard from './StoreOrdeeCard';
function CompletedOrderCard() {
    const location=useLocation();
    const [completedOrders, setCompletedOrders] = useState([]);
    useEffect(()=>{
        getOrders()
    },[]);
    async function getOrders(){
        let response=await getOrderStatusWise("complete",location.state.item.id)
        if(response.error){
            alert("Something went wrong!");
            return;
        }
        setCompletedOrders(response.data)
    }
    return (
        <>
            <div style={{ width: "100%", textAlign: "center" }}>
                <h1>Completed Order of Store Name</h1>
            </div>
            <div className="order_card_container" style={{ margin: "auto", width: 'auto', width: "80%" }}>
                <div className="order_card">
                    <div className="order_card_img">
                        <img src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png" alt="" />
                    </div>
                    <div className="order_card_details">
                        <h3>{location.state.item.shopName}</h3>
                        <div className="order_details">
                            <p>Total Active Order : {completedOrders.length ===0?0:completedOrders.length}</p>
                        </div>

                    </div>
                </div>
            </div>
            <h2 style={{marginLeft:150}}>Orders</h2>
            <div className='orders-container'>
                {   
                    completedOrders.length===0?<h3 style={{fontSize:20,marginLeft:150}}>No complete Order</h3>:
                    completedOrders.map((item,index)=>(
                        <StoreOrdeeCard key={index} storeData={location.state.item} ordereData={item} />
                    ))
                }
            </div>
        </>
    )
}

export default CompletedOrderCard