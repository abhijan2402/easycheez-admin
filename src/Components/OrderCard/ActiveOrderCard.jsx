import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
import { Link } from "react-router-dom";
function ActiveOrderCard() {
    return (
        <>
            <div style={{ width: "100%", textAlign: "center" }}>
                <h1>Active Order of Store Name</h1>
            </div>
            <div className="order_card_container" style={{ margin: "auto", width: 'auto', width: "80%" }}>
                <div className="order_card">
                    <div className="order_card_img">
                        <img src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png" alt="" />
                    </div>
                    <div className="order_card_details">
                        <h3>Stoe name</h3>
                        <div className="order_details">
                            <p>Total Active Order :</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveOrderCard