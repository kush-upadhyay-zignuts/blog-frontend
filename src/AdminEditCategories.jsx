import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const AdminEditCategories = () => {
  const { id } = useParams(); // Getting id from URL
  const navigate = useNavigate(); // For redirection after form submit

  const [category, setCategory] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    // Fetch existing category data
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/categories/edit`);
        setCategory(response.data.title); // Assuming { category: 'category name' }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/categories/edit`, { category });
      toast.success("Category Edited successfully!");
      setTimeout(() => {
          navigate(-1); // or wherever you want after success
          // navigate('/admin/categories'); 
      }, 2000);
    } catch (error) {
      console.error('Error updating category:', error);
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
    <div className=" mx-auto" style={{ width: '40rem',marginTop:"5rem" }}>
      <form onSubmit={handleSubmit} className="mx-auto">
        <h1 className="mb-4">Update Category</h1>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category Name</strong>
          </label>
          <input
            type="text"
            value={category}
            name="category"
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

      <Link to="/admin/categories">
        <button style={{ width: '6rem' }} className="btn btn-primary">
          Cancel
        </button>
      </Link>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
    </>
  );
};

export default AdminEditCategories;
