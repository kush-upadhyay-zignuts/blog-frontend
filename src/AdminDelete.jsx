import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function DeleteBlog() {
  const { id } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/delete`, { withCredentials: true });
        setBlog(res.data);
        console.log(res.data)
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog data.");
      }
    }
    fetchBlog();
  }, [id]);

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await axios.delete(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/delete`, { withCredentials: true });
  toast.success("Blog is Deleted successfully!");
            setTimeout(() => {
                navigate(-1); // or wherever you want after success
            }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete the blog.");
    }
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
        <h1 className="display-4 text-danger mb-4">Error</h1>
        <p className="lead">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (<>
      <Navbar/>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    </>
    );
  }

  return (
    <>
   
    <Navbar/>
    {loading &&  <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
    <button
     onClick={handleGoBack}
     className="btn btn-light position-absolute top-0.5  m-3 border-0 fs-3"
     style={{ left: "50px", top:"60px" }}
   >
        &larr;
   </button>
    <div className="mx-auto" style={{ width: "40rem", marginTop:"5rem" }}>
      <form onSubmit={handleDelete} className="mx-auto">
        <h1 className="mb-4">Are you sure for <span className="text-danger">delete  </span> ?</h1>

        <div className="mb-3">
          <label className="form-label">
            <strong>Name/Title: {blog.title}</strong>
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <strong>Category: {blog.category}</strong>
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <strong>Id: {blog._id}</strong>
          </label>
        </div>

        <button type="submit" style={{ width: "6rem" }} className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <button
        onClick={() => navigate(-1)}
        style={{ width: "6rem" }}
        className="btn btn-primary"
      >
        Cancel
      </button>
              <ToastContainer position="top-right" autoClose={5000} />
    </div>
    </>
  );
}
