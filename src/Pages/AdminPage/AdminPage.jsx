import React from "react";
import './Admin.css';
import pic from "../../assest/adminpic.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <div className="container-main">
        <div className="Admin_container">
          <div className="Admin_details">
            <h1>Admin page</h1>
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
                style={{marginTop:"20px"}}
              />

                <Button
                  variant="contained"
                  className="btn_1"
                  style={{ backgroundColor: "#005B8F", marginTop:"20px" }}
                >
                  Login
                </Button>

            </div>
            <Link to="/ForgetPassword" style={{ textDecoration: "none", cursor: "pointer" }}>
              <p>Forget Password ?</p>
            </Link>
            <Link to="/SignUp" style={{ textDecoration: "none", cursor: "pointer" }}>
              <p>Don't have an account? <span style={{color:"black"}}>Sign Up</span></p>
            </Link>
          </div>
          <div className="admin_img">
            <img src={pic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
