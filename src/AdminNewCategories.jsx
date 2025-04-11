import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminNewCategories = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://blog-backend-1-5vcb.onrender.com/api/admin/categories/new', { category });
       toast.success("Category Added successfully!");
                  setTimeout(() => {
                      navigate("/blogs"); // or wherever you want after success..
                  }, 2000);
    } catch (error) {
      console.error('Error adding new category:', error);
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
            &larr;
       </button>
    <div className=" mx-auto" style={{ width: '40rem' ,marginTop:"5rem" }}>
      <form onSubmit={handleSubmit} className="mx-auto">
        <h1 className="mb-4">Add New Category</h1>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category Name</strong>
          </label>
          <input
            type="text"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
            className="form-control"
            id="category"
          />
        </div>

        <button type="submit" style={{ width: '6rem' }} className="btn btn-primary">
          Submit
        </button>
      </form>

      <br />

      <Link to="/blogs">
        <button style={{ width: '6rem' }} className="btn btn-primary">
          Cancel
        </button>
      </Link>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
    </>
  );
};

export default AdminNewCategories;
