import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
const OrderCard = () => {
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
            setTotalOrderLength(len)
            console.log(TotalOrderLength, "length")

            setOrderDetail(resultArray)
            console.log(orderDetail)
        })
    }
    return (
        <>
            <div className="order_card_container">
                <div className="order_card">
                    <div className="order_card_img">
                        <img src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png" alt="" />
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