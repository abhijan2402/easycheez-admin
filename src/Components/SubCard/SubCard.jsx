import React from "react";

import "./SubCard.css";

import shopImage from "../../assest/sub.png";

const SubCard = () => {
  return (
    <>
      <div className="main_container">
        <div className="subscription_container"></div>
        <div className="subscription_detail_container">
          <h4>Varinda Shop</h4>
          <img src={shopImage} alt="" />
          <p>Subscription valid till - 9 FEB</p>
          <p className="sub">Subscription 499/-</p>
        </div>
      </div>
    </>
  );
};

export default SubCard;
