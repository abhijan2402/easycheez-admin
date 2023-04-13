import React from "react";
import { Link } from "react-router-dom";

import "./Subscriber.css";
import home from "../../assest/home.png";
import SubCard from "../../Components/SubCard/SubCard";

const Subscriber = () => {
  return (
    <>
      <div className="subscriber_container">
        <div className="subscriber_bar">
          {/* <div className="subscriber_home_icon"><img src={home} alt="" /></div> */}
          <div className="subscriber_page">

            <p className="active">Subscription</p>
          </div>
        </div>
        <div className="subscriber_card">
          <SubCard />
        </div>
      </div>
    </>
  );
};

export default Subscriber;
