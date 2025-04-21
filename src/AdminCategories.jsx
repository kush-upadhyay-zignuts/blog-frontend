import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router
import axios from 'axios';
import Navbar from './Navbar';
import LeftMenu from './LeftMenu';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from API on mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://blog-backend-1-5vcb.onrender.com/api/admin/categories');
        setCategories(response.data); // Assume backend sends array of categories/blogs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Assuming partial head and nav are already in your main App Layout */}
      <Navbar/>
      <LeftMenu/>

      <table id="blog-table" className="mx-auto" style={{marginTop:"5rem"}}>
        <thead>
          <tr id="blog-head-row">
            <th className="head-data">Name</th>
            <th className="head-data">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr id="blog-body-row" key={category._id || category.title}>
              <td className="body-data">{category.title}</td>
              <td className="body-data">
                <Link to={`/admin/${category.title}/categories/delete`}>
                  <i className="fa-regular fa-trash-can"></i>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/admin/${category.title}/categories/edit`}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          {loading &&  <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
      {/* Assuming partial script is handled globally, so no need to add again */}
    </div>
  );
};

export default AdminCategories;
