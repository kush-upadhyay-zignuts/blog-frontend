// 



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../constants/constant"; // Assuming you have these constants
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Signin() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  
  const navigate = useNavigate(); // to redirect after login
 

  const handleGoBack = () => {
    navigate(-1);
  };

  // Validate inputs
  const validateInputs = () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let isValid = true;

    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!passwordInput.value.trim() || !passwordRegex.test(passwordInput.value.trim())) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("https://blog-backend-1-5vcb.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      });
      const res = await response.json()
      console.log( res.roles);    
      
      if (response) {
          localStorage.setItem("LoggedInUser", res.email)
          localStorage.setItem("CurrentUserRole",res.roles)
        toast.success("Login Successfully");
        setTimeout(()=>{
       navigate(-1)// Redirect to /user if login successful
          
        },2000)
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    // You can customize this
    toast.info("Google sign-in clicked (functionality to be implemented)");
  };

  return (
    <>
   
      <Navbar/>
       <button
        onClick={handleGoBack}
        className="btn btn-light position-absolute top-0.5  m-3 border-0 fs-3"
        style={{ left: "50px", top:"60px" }}
      >
           &larr;
      </button>
    <div className="container  d-flex justify-content-center align-items-center"  style={{ marginTop:"5rem" }} >
      <div className="card shadow p-4" style={{ width: "40rem" }}>
        <h1 className="text-center mb-4" style={{ fontSize: "2.2rem" }}>Sign In</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            {emailError && <div className="invalid-feedback">{emailErrorMessage}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="••••••"
              required
            />
            {passwordError && <div className="invalid-feedback">{passwordErrorMessage}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
        </form>

        {/* <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        <button className="btn btn-outline-primary w-100 mb-3" onClick={handleGoogleSignIn}>
          <i className="bi bi-google"></i> Sign in with Google
        </button>

        <div className="text-center">
          <p className="mb-0">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div> */}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
    </>
  );
}
