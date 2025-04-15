import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminNew = () => {
  const navigate = useNavigate();
  const [category,setCategory] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    Image: null,
  });
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
      async function fetchCategory() {
        try {
          const res = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/admin/blogs/new`, { withCredentials: true });
          // const res = await axios.get(`/api/admin/blogs/new`, { withCredentials: true });
         const data = res.data;       
          setCategory(res.data);
        } catch (err) {
          console.error(err);
          
        }
      }
      fetchCategory();
    }, []);

  const handleChange = (e) => {
    if (e.target.name === 'Image') {
      setFormData({ ...formData, Image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('Image', formData.Image);
        console.log(data)
      await axios.post('https://blog-backend-1-5vcb.onrender.com/api/admin/blogs/new', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       toast.success("New Blog is successfully Added!");
       setTimeout(() => {
         navigate('/blogs'); // Redirect after successful submission
         
       },2000);
    } catch (error) {
      console.error('Error submitting blog:', error);
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
      <form onSubmit={handleSubmit} className="mx-auto" encType="multipart/form-data">
        <h1 className="mb-4">Add New Blog</h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Name/Title</strong>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category</strong>
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className="form-control"
            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
            required
            value={formData.category}
            onChange={handleChange}
          />
        </div> */}
         <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category</strong>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            className="form-control"
            id="category"
            required
          >
            <option value="">Select a Category</option>
            {category.map((cat, index) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <strong>Description</strong>
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Image" className="form-label">
            <strong>Image</strong>
          </label>
          <input
            type="file"
            name="Image"
            id="Image"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '6rem' }}>
          Submit
        </button>
      </form>

      <br />

      <button
        onClick={() => navigate('/blogs')}
        className="btn btn-primary"
        style={{ width: '6rem' }}
      >
        Cancel
      </button>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
    </>
  );
};

export default AdminNew;
