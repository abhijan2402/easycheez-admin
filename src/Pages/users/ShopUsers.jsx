import React, { useState } from 'react'
import './user.css'
import UserCard from '../../Components/Users/UserCard'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useEffect } from 'react';
const ShopUsers = () => {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        getAllShopUsers()
    }, [])
    const getAllShopUsers = () => {
        let resultArray = [];
        const baseQuery = query(collection(db, "Users"));
        getDocs(baseQuery).then((res) => {
            res.forEach((item) => {
                resultArray.push({ id: item.id, ...item.data() });
            })
            setUsers(resultArray);
        })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        <>
            <div className="comission_list_container">
                <div className="comission_list_bar">
                    <div className="comission_list_page">
                        <p>All Sellers</p>
                    </div>
                    <div onClick={() => { getAllShopUsers() }} style={{ color: "white", alignSelf: "center", marginRight: "3%", border: '1px solid white', padding: "5px 10px", borderRadius: "5px" }}>Refresh</div>
                </div>
                <div className="comission_list">
                    <div className="cards">
                        {
                            users.map((user, index) => (
                                <UserCard key={index} item={user} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopUsers