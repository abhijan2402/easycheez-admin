import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './OrderCard.css'
import orderImage from '../../assest/order.png'
import { ContextData } from '../../App';
const OrderCard = () => {
    let glob = 0
    const { userUid, getAutherUserDetails } = useContext(ContextData);
    const [orderDetail, setOrderDetail] = useState([]);
    const [StoreDetail, setStoreDetail] = useState([]);
    const [TotalOrderLength, setTotalOrderLength] = useState('')
    const [SingleLength, setSingleLength] = useState('')
    useEffect(() => {
        getStoreDetails()
        getOrderData();
        // getSellerOrderData();
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
            // console.log(TotalOrderLength, "length")
        })
    }
    const getStoreDetails = async () => {
        let resultArray = [];
        let i = 0;
        let resultArray1 = [];
        // let conditinoOne = where("UserUid", "==", userUid);
        const baseQuery = query(collection(db, "StoreRegis"));
        getDocs(baseQuery).then((res) => {
            res.forEach((item) => {
                resultArray.push({ id: item.id, ...item.data() });
            })
            // console.log(resultArray, "i am resultakadcbdkj")
            setStoreDetail(resultArray)

            // for (i = 0; i < StoreDetail.length; i++) {

            //     // console.log(resultArray, "I am herrb")
            //     const baseQuery = query(collection(db, "OrderPage"), where("shopID", "==", StoreDetail[i].id));
            //     getDocs(baseQuery).then((res) => {
            //         res.forEach((item) => {
            //             resultArray1.push({ id: item.id, ...item.data() });
            //         })
            //         let len = resultArray1
            //         setSingleLength(len)
            //     })
            // }
            // console.log(resultArray1, "i am order array")
            // console.log(SingleLength, " i am kength")
        })
    }
    // const getSellerOrderData = async (shopID) => {
    //     console.log(shopID, "shopID")
    //     let resultArray = [];
    //     // let conditinoOne = where("UserUid", "==", userUid);
    //     const baseQuery = query(collection(db, "OrderPage"), where("shopID", "==", shopID));
    //     await getDocs(baseQuery).then((res) => {
    //         res.forEach((item) => {
    //             resultArray.push({ id: item.id, ...item.data() });
    //         })
    //         let len = resultArray
    //         setSingleLength(len.length)

    //         // setOrderDetail(resultArray)
    //         // console.log(orderDetail)
    //     })
    //     // console.log(resultArray, "i am order array")
    //     console.log(SingleLength, "i am length")
    //     return SingleLength
    // }
    function ten(id) {
        const resultArray1 = [];
        var i
        const baseQuery = query(collection(db, "OrderPage"), where("shopID", "==", id));
        getDocs(baseQuery).then((res) => {
            res.forEach((item) => {
                resultArray1.push({ id: item.id, ...item.data() });
            })
            glob = resultArray1
        })
        return glob
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
                                    <p>Total Order :{ten(item.id)}</p>
                                    <p>Contact Details : {item.MobileNum}</p>
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