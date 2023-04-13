import React, { useEffect, useState } from 'react'

import './PercentCard.css';
import percentcard from '../../assest/percentcard.png'
import { db, storage } from "../../firebase";
import { collection, query, getDocs, documentId, where } from "firebase/firestore";
import Subscriber from '../../Pages/Subscriber/Subscriber';
const PercentCard = () => {
    useEffect(() => {
        getData();
      }, []);
      const [data, setdata] = useState([]);
      const getData = async () => {
          const finalCommisionArray=[]
          let resultArray = [];
          const q = query(collection(db, "Comission"));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            resultArray.push({ id: doc.id, ...doc.data() });
          });
          setdata(resultArray);
      };
      
  return (
    <>
    {data.map((item) =>(
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
                 <p>Contact details : {item.Phone}</p>
                 <p>PinCode : {item.Pincode}</p>
                 <p>Subscription valid till : 9, FEB</p>
             </div>
         </div>
     </div>
 </div>
   )) }
       
    </>
  )
}

export default PercentCard