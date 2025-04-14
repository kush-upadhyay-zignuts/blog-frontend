// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFirebase } from "../context/firebase";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/signup', formData, { withCredentials: true });
//       navigate('/signin'); // redirect after signup success
//     } catch (error) {
//       console.error('Signup error:', error);
//     }
//   };

//   return (
//     <div className="mt-5 mx-auto" style={{ width: '40rem' }}>
//       <form onSubmit={handleSubmit} className="mx-auto">
//         <h1 className="mb-4">Sign Up</h1>

//         <div className="mb-3">
//           <label htmlFor="fullname" className="form-label">
//             <strong>Full name</strong>
//           </label>
//           <input
//             type="text"
//             name="fullname"
//             id="fullname"
//             className="form-control"
//             style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
//             value={formData.fullname}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             <strong>Email address</strong>
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="form-control"
//             style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             <strong>Password</strong>
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             className="form-control"
//             style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary" style={{ width: '6rem' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;





import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { nameRegex, passwordRegex, emailRegex } from "../constants/constant";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // for redirection after signup (optional)
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

   
  
    const handleGoBack = () => {
      navigate("/blogs");
    };

  const validateInputs = () => {
    const { fullname, email, password } = formData;
    const newErrors = {};

    if (!fullname.trim() || !nameRegex.test(fullname.trim())) {
      newErrors.fullname =
        "Name can only contain alphabets and spaces, with no leading or trailing spaces.";
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password.trim() || !passwordRegex.test(password.trim())) {
      newErrors.password =
        "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
    //   const response = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
      const response = await axios.post(`https://blog-backend-1-5vcb.onrender.com/api/signup`, formData, {withCredentials: true});
            if(response){
              toast.success("Signed up successfully!");
                setTimeout(()=>{
                navigate("/blogs")
                  
                },2000)

            }
            else{
                toast.error("something went wrong")
            }
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (

    <>
   
    <Navbar/>
     <button
      onClick={handleGoBack}
      className="btn btn-light position-absolute top-0.5  m-3 border-0 fs-3"
      style={{ left: "50px", top:"60px" }}
    >
      {/* &times; */}
      &larr;
    </button>
    <div className="container  d-flex justify-content-center"  style={{  marginTop:"5rem" }}>
      <div className="card p-4 shadow" style={{ width: "40rem" }}>
        <h1 className="mb-4 text-center">Sign Up</h1>
        <form method="POST" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            />
            {errors.fullname && (
              <div className="invalid-feedback">{errors.fullname}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </>
  );
}



