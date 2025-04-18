import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
    const [user, setUser] = useState(""); 
    const navigate = useNavigate();

     const loggedInUser =  localStorage.getItem("LoggedInUser")

     const handleSignin = () => {
      navigate("/signin");
    };
    const handleSignup = () => {
      navigate("/signup");
    };

     useEffect(() => {
         const loggedInUser = localStorage.getItem("LoggedInUser");
         if (loggedInUser) {
           setUser(loggedInUser);
         }
     }, []);
 
    //  useEffect(() => {
    //   const handleStorageChange = () => {
    //     const loggedInUser = localStorage.getItem("LoggedInUser");
    //     if (loggedInUser) {
    //       setUser(loggedInUser);
    //     }
    //   };
    
    //   window.addEventListener("storage", handleStorageChange);
    
    //   // Optional: Also update state right away
    //   handleStorageChange();
    
    //   return () => {
    //     window.removeEventListener("storage", handleStorageChange);
    //   };
    // }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top nav-color ">
    <div className="container-fluid">
      <a className="navbar-brand text-info" href="#">StoryHaven </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         
        </ul>
        
      </div>
          {/* <div 
        className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
        style={{
          width: `50px`,
          height: `50px`,
          fontSize: `25px`,
          fontWeight: "bold",
        }}
      >
         {user ? user.trim().split(" ")[0] : "Login"}
      </div> */}
              <div className="d-flex align-items-center ms-auto me-2">
  <div id="nav-dropdown" className="dropdown bg-transparent">
    {!user ? (
      <button
        id="nav-dropdown-button"
        className="btn text-white dropdown-toggle me-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Login
      </button>
    ) : (
      <div
        id="nav-dropdown-button"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="d-flex align-items-center justify-content-center dropdown-toggle btn rounded-circle bg-info text-white me-2"
        style={{
          width: "50px",
          height: "50px",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        {user.trim().charAt(0).toUpperCase()}
      </div>
    )}
    <ul className="dropdown-menu mt-2" style={{zIndex: 1250}} >
      {user ? (
        <li style={{zIndex: 1250}} ><a className="dropdown-item px-0"  href="/logout">Logout</a></li>
      ) : (
        <>
          {/* <li style={{zIndex: 1250}} ><a className="dropdown-item px-0" href="/signup">Sign up</a></li> */}
          <li style={{zIndex: 1250}} ><button onClick={handleSignup} className="dropdown-item px-0">
                        Sign Up
                        </button></li>
          <li style={{zIndex: 1250}} > <button onClick={handleSignin} className="dropdown-item px-0">
                        Sign In
                        </button></li>
        </>
      )}
    </ul>
  </div>
</div>

    </div>
  </nav>
    </div>
  )
}

export default Navbar
