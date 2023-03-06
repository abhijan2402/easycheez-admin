import React from "react";
import "./Frogetpassword.css";
import pic from "../../assest/fg_pass.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <>
      <div className="container_main">
        <div className="container">
          <div className="password_details">
            <h1>Forget Password</h1>
            <div className="email">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="text_field"
              />
              <Link
                to=""
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  marginTop: "50px",
                }}
              >
                <Button
                  variant="contained"
                  className="btn_1"
                  style={{ backgroundColor: "#005B8F" }}
                >
                  Send Link
                </Button>
              </Link>
            </div>
            <div className="forget_link">
            <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
              
              <p>Back to Login</p>
            </Link>
            </div>
            
          </div>
          <div className="bg_img">
            <img src={pic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
