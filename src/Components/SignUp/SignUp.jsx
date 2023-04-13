import React, { useState } from "react";
import "./SignUp.css";
import TextField from "@mui/material/TextField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection, } from "firebase/firestore";
const SignUp = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const NewUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, 'Users', user.uid);
        setDoc(userRef, {
          admin: true,
          email: email,
        })
          .then(() => {
            alert("Account Created");
            // navigate('/VTechadmin')
          })
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email Already Exists")
            break;
          default:
            break;
        }
      });
  }
  return (
    <>
      <div className="signup_container_main">
        <div className="signup_container">
          <div className="signup_img">
            <img src="https://bpak.com/wp-content/uploads/2023/01/undraw_Fingerprint_login_re_t71l-500x404.png" alt="" />
          </div>
          <div className="signup_details">
            <h1>Sign Up</h1>
            <div className="email">
              {/* <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="text_field"
                onChange={(event) => setemail(event.target.value)}
              /> */}
              <input type="text" placeholder="Email" className="email-input" onChange={(event) => setemail(event.target.value)} />
              {/* <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="password_field"
                style={{ marginTop: "20px" }}
                onChange={(event) => setpassword(event.target.value)}
              /> */}
               <input type="password" placeholder="password" className="email-input" style={{marginTop:"30px"}}  onChange={(event) => setpassword(event.target.value)} />
              {/* <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                className="password_field"
                style={{ marginTop: "20px" }}
              /> */}
              <input type="password" placeholder="confirm password" className="email-input" style={{marginTop:"30px"}}  onChange={(event) => setpassword(event.target.value)} />

              <Button
                variant="contained"
                className="btn_1"
                style={{ backgroundColor: "#005B8F", marginTop: "20px" }}
                onClick={NewUser}
              >
                Sign Up
              </Button>
            </div>
            <div className="signup_link">
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
      </div>
    </>
  );
};

export default SignUp;
