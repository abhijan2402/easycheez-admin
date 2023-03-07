import React, { useState } from "react";
import "./Frogetpassword.css";
import pic from "../../assest/fg_pass.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
const ForgetPassword = () => {
  const [email, setemail] = useState(null)
  const ResetLink = async () => {
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {

          console.log("link sent successfully")
          setemail("")
          alert("Link Send Successfully (Check Spam Also)")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        });
    } catch (error) {
      console.log(error);
    }
  }
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
                onChange={(event) => setemail(event.target.value)}
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
                  onClick={ResetLink}
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
            <img src="https://static1.squarespace.com/static/5ebd684d21cb6b6024d21293/t/62273f5ca36a923ea07dc5a7/1646739296071/undraw_Forgot_password_re_hxwm.png?format=1500w" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
