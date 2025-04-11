import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminDeleteCategories = () => {
  const { id } = useParams(); // get the id from URL
  const navigate = useNavigate(); // for redirection
  const [category, setCategory] = useState(id);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Fetch the category to display
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/categories/delete`);
        setCategory(response.data.title); // Assuming { category: "..." }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/categories/delete`);
  toast.success("Category Deleted successfully!");
            setTimeout(() => {
                navigate(-1); // or wherever you want after success
            }, 2000);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
      <>
       
        <Navbar/>
        <button
         onClick={handleGoBack}
         className="btn btn-light position-absolute   m-3 border-0 fs-3"
         style={{ left: "50px", top:"60px" }}
       >
            &larr;
       </button>
    <div className=" mx-auto" style={{ width: '40rem' ,marginTop:"5rem" }}>
      <form onSubmit={handleDelete} className="mx-auto">
        <h1 className="mb-4">Are You Want to Delete Category ?</h1>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category : {category}</strong>
          </label>
        </div>

        <button type="submit" style={{ width: '6rem' }} className="btn btn-primary">
          Delete
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

export default AdminDeleteCategories;
