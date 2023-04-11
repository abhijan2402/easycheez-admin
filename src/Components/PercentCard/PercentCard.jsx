import React, { useEffect, useState } from 'react'

import './PercentCard.css';
import percentcard from '../../assest/percentcard.png'
import { db, storage } from "../../firebase";
import { collection, query, getDocs, documentId, QuerySnapshot } from "firebase/firestore";
import Subscriber from '../../Pages/Subscriber/Subscriber';
const PercentCard = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = useState([]);
  const getData = async () => {
    let resultArray = [];
    const q = query(collection(db, "Comission"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArray.push({ id: doc.id, ...doc.data() });
    });
    console.log(resultArray)
    setdata(resultArray);
    console.log(data)
  };

  return (
    <>
      {data.map((item) => (
        <div className="percent_card_container">
          <div className="percent_card">
            <div className="card_img">
              <h3>{item.StoreName}</h3>
              <img src={percentcard} alt="" />
            </div>
            <div className="card_details">

              <div className="details">
                {/* <p >hi</p> */}
                <p>Location :{item.location}</p>
                <p>Purchased on : {item.PurchasedDate.substring(0, 15)}</p>
                {/* <p>PinCode : {item.Pincode}</p> */}
                <p>Commission to be taken on : {item.expireDate.substring(0, 15)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

    </>
  )
}

export default PercentCard