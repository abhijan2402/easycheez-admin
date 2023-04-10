import React from 'react'
import './OrderCard.css'
const StoreOrdeeCard = ({ordereData,storeData}) => {
    return (
        <div className="order_card_container" style={{ margin: "auto", width: 'auto', width: "80%",marginBottom:10 }}>
            <div className="order_card" style={{display:"flex",flexDirection: 'row',}}>
                <div className="order_card_img">
                    <img src={storeData.StoreImage} alt="store" style={{borderRadius:10}} />
                </div>
                <div style={{marginLeft:10,alignItems:"center"}}>
                    <div  style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
                        <h3 style={{fontSize:20}}>Order Details</h3>
                        <div style={{marginLeft:10}}>
                            <p>Order On : {`${new Date(ordereData.orderDate).getDate()}-${new Date(ordereData.orderDate).getMonth()}-${new Date(ordereData.orderDate).getFullYear()}`}</p>
                            <p>Order Price : {ordereData.totalAmount} Rs/-</p>
                            <p>Total Items : {ordereData.numOfItems}</p>
                        </div>
                    </div>
                    <div  style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
                        <h3 style={{fontSize:20}}>Customer Details</h3>
                        <div style={{marginLeft:10}}>
                            <p>Orders By : {ordereData.orderBY}</p>
                            <p>Address : {ordereData.customAddedss}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreOrdeeCard