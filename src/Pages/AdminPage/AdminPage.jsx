import React, { useState, useContext } from "react";
import './Admin.css';
import pic from "../../assest/adminpic.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const AdminPage = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const navigate = useNavigate()
  const newUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid)
        navigate('/ComissionMainPage')
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Incorrect Email")
            break;
          case "auth/wrong-password":
            alert("Incorrect Password");
            break;
          default:
            break;
        }
      });
  }
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
                onChange={(event) => setemail(event.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="password_field"
                style={{ marginTop: "20px" }}
                onChange={(event) => setpassword(event.target.value)}
              />
              {/* <Link to='ComissionMainPage' style={{ textDecoration: "none" }}> */}
              <Button
                variant="contained"
                className="btn_1"
                style={{ backgroundColor: "#005B8F", marginTop: "20px" }}
                onClick={newUser}
              >
                Login
              </Button>
              {/* </Link> */}


            </div>
            <div className="links">
              <Link to="/ForgetPassword" style={{ textDecoration: "none", cursor: "pointer" }}>
                <p>Forget Password ?</p>
              </Link>
              <Link to="/SignUp" style={{ textDecoration: "none", cursor: "pointer" }}>
                <p>Don't have an account? <span style={{ color: "black" }}>Sign Up</span></p>
              </Link>
            </div>

          </div>
          <div className="admin_img">
            <img src="https://rocketlink.io/wp-content/uploads/2021/05/undraw_Social_user_re_8cky.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
