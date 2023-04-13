import React, { useState } from 'react'
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { deleteUser } from "firebase/auth";

const UserCard = ({item}) => {
    const [deleteing,setDeleting]=useState(false)
    const [storedetail,setStoreDetails]=useState("");
    const [profiledetail,setprofileDetails]=useState("");
    const [storedetailBox,setStoreDetailsBox]=useState(false);
    const [profiledetailBox,setprofileDetailsBox]=useState(false);
    const getStoreDetails=()=>{
        if(item.storeID===undefined){
            alert("Seller not setup its shop yet")
            return
        }
        if(storedetailBox){
            setStoreDetailsBox(false)
            return
        }
        if(storedetail===""){
            const baseQuery = doc(db,"StoreRegis",item.storeID);
            getDoc(baseQuery).then((res) => {
                setStoreDetails({...res.data(),id:res.id})
                setStoreDetailsBox(true)
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        else{
            setStoreDetailsBox(true)
        }
    }
    const getProfileDetails=()=>{
        if(item.profileID===undefined){
            alert("Seller not setup its Profile yet")
            return
        }
        if(profiledetailBox){
            setprofileDetailsBox(false)
            return
        }
        if(storedetail===""){
            const baseQuery = doc(db,"SellerShop",item.profileID);
            getDoc(baseQuery).then((res) => {
                setprofileDetails({...res.data(),id:res.id})
                setprofileDetailsBox(true)
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        else{
            setprofileDetailsBox(true)
        }
    }
    const deleteUser=async()=>{
        if(deleteing){
            return
        }
        setDeleting(true);
        await deleteDoc(doc(db, "Users", item.id));
        await deleteDoc(doc(db, "StoreRegis", item.storeID));
        await deleteDoc(doc(db, "SellerShop", item.profileID));
        // deleteUser(item.id)
        // .then(() => {
        //     console.log("USer deleted")
        // }).catch((error) => {
        //     console.log(error);
        // });
        setDeleting(false);

    }
    return (
        <div className='card_body'>
            <div onClick={deleteUser} style={{display:"flex",justifyContent:"flex-end"}}>
                <button className='trash_button'>
                    <i class="fa fa-trash"></i>
                </button>
            </div>
            <p className='title_text_1'>Store Owner Email : {item.email}</p>
            <p className='title_text_1'>Store Subscription  : {item.isPlusMember?"Plus Member":"Not Plus Member"}</p>
            <div className='button_container'>
                <button className='user_card_button' onClick={getStoreDetails}>
                    Store details
                </button>
                <button className='user_card_button' onClick={getProfileDetails}>
                    Profile details
                </button>
            </div>
            {
                storedetailBox &&
                <div>
                    <p className='title_text'>Store Details</p>
                    <p className='title_text_1'>Store Name : {storedetail.storeName}</p>
                    <p className='title_text_1'>Store Address : {`${storedetail.Address} ${storedetail.LandMark}`}</p>
                    <p className='title_text_1'>Store Category : {storedetail.category}</p>
                    <p className='title_text_1'>Store Phone : {storedetail.phone}</p>
                </div>
            }
            {
                profiledetailBox && 
                <div>
                    <p className='title_text'>Profile Details</p>
                    <p className='title_text_1'>Store Owner Name : {`${profiledetail.FirstName} ${profiledetail.LastName}`}</p>
                    <p className='title_text_1'>Store Owner Mobile : {profiledetail.MobNum}</p>
                    <p className='title_text_1'>Store Owner Address : {`${profiledetail.City} ${profiledetail.State}`}</p>
                </div>
            }
        </div>
    )
}

export default UserCard