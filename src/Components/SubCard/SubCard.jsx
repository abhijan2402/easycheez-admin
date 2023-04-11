import React, { useEffect, useState } from "react";

import "./SubCard.css";

import shopImage from "../../assest/sub.png";
import { db, storage } from "../../firebase";
import { collection, query, getDocs, documentId, QuerySnapshot } from "firebase/firestore";
const SubCard = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = useState([]);
  const getData = async () => {
    let resultArray = [];
    const q = query(collection(db, "Subscription"));
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
        <div className="main_container">
          <div className="subscription_container"></div>
          <div className="subscription_detail_container">
            <h4>{item.StoreName}</h4>
            <img
              src="https://knowreva.netlify.app/buildings/undraw_Building_re_xfcm.png"
              alt=""
            />
            {/* <p>Subscription valid till - 9 FEB</p>
          <p className="sub">Subscription 499/-</p> */}
            <p>Location :{item.location}</p>
            <p>Valid till : {item.expireDate.substring(0, 15)}</p>
          </div>
        </div>
      ))}

    </>
  );
};

export default SubCard;
