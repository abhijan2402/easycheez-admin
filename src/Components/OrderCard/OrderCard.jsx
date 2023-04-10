import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
import { Link, useLocation } from "react-router-dom";

const OrderCard = () => {
    
    const { userUid, getAutherUserDetails } = useContext(ContextData);
    const [orderDetail, setOrderDetail] = useState([]);
    const [StoreDetail, setStoreDetail] = useState([]);
    const [TotalOrderLength, setTotalOrderLength] = useState('')
    const [SingleLength, setSingleLength] = useState('')
    useEffect(() => {
        getStoreDetails()
    }, [])


    const getStoreDetails = async () => {
        let resultArray = [];
        const baseQuery = query(collection(db, "StoreRegis"));
        getDocs(baseQuery).then((res) => {
            res.forEach((item) => {
                resultArray.push({ id: item.id, ...item.data() });
            })
            setStoreDetail(resultArray)

        })
    }
    return (
        <>
            {
                StoreDetail.map((item) => (
                    <div className="order_card_container">
                        <div className="order_card">
                            <div className="order_card_img">
                                <img src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png" alt="" />
                            </div>
                            <div className="order_card_details">
                                <h3>{item.storeName}</h3>
                                <div className="order_details">
                                    {/* {
                                        SingleLength.map((SingleLen) => (

                                            item.id == SingleLen.shopID ? <p>Total Order : {ten()}</p> : ""

                                        ))
                                    } */}
                                    <p>Total Order :</p>
                                    <p>Contact Details : </p>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-around", textAlign: "center" }}>

                                    <Link to="/ActiveOrderCard" style={{ textDecoration: "none", cursor: "pointer" }}
                                        state={{item:item}}
                                    >
                                        <button style={{ color: "white", backgroundColor: "#005b8f", borderRadius: "5px", padding: "5px 10px 5px 10px" }}>
                                            See Active Order
                                        </button>
                                    </Link>
                                    <Link to="/ComOrderCard" style={{ textDecoration: "none", cursor: "pointer" }} state={{item:item}}>
                                        <button style={{ color: "white", backgroundColor: "#005b8f", borderRadius: "5px", padding: "5px 10px 5px 10px" }}>
                                            See Completed Order
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }
        </>
    )
}

export default OrderCard