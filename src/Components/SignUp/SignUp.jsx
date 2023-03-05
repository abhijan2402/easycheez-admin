import React from "react";
import "./SignUp.css";
import pic from "../../assest/signup.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="signup_container_main">
        <div className="signup_container">
          <div className="signup_img">
            <img src={pic} alt="" />
          </div>
          <div className="signup_details">
            <h1>Sign Up</h1>
            <div className="email">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="text_field"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="password_field"
                style={{ marginTop: "20px" }}
              />
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                className="password_field"
                style={{ marginTop: "20px" }}
              />

              <Button
                variant="contained"
                className="btn_1"
                style={{ backgroundColor: "#005B8F", marginTop: "20px" }}
              >
                Sign Up
              </Button>
            </div>
            <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
              <p>
                Already have an account?
                <span style={{ color: "black", paddingLeft: "5px" }}>
                  Log In
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
