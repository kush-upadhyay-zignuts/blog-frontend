import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category,setCategory] = useState([])
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    Image: null, // For the new uploaded file
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/edit`, { withCredentials: true });
       const data = res.data;
        console.log(res.data)
        setBlog({
          title: data.blog.title,
          category: data.blog.category,
          description: data.blog.description,
          Image: null,
        });
        setCategory(data.category)
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog data.");
      }
    }
    fetchBlog();
  }, [id]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "Image") {
      setBlog((prev) => ({ ...prev, Image: files[0] }));
    } else {
      setBlog((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("category", blog.category);
    formData.append("description", blog.description);
    formData.append("id", id);
    if (blog.Image) {
      formData.append("Image", blog.Image);
    }

    try {
      await axios.put(`https://blog-backend-1-5vcb.onrender.com/api/admin/${id}/edit`, formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  toast.success("Blog Updated successfully!");
            setTimeout(() => {
                navigate(-1); // or wherever you want after success
            }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to update the blog.");
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

  // if (!blog.title && !error) {
  //   return (
  //     <div className="d-flex align-items-center justify-content-center min-vh-100">
  //       <h4>Loading...</h4>
  //     </div>
  //   );
  // }

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
    
    <div className=" mx-auto" style={{ width: "40rem",marginTop:"5rem" }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mx-auto">
        <h1 className="mb-4">Update The Blog</h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Name/Title</strong>
          </label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            className="form-control"
            id="title"
            required
          />
        </div>

        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category</strong>
          </label>
          <input
            type="text"
            name="category"
            value={blog.category}
            onChange={handleChange}
            style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            className="form-control"
            id="category"
            required
          />
        </div> */}
          <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <strong>Category</strong>
          </label>
          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
            style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            className="form-control"
            id="category"
            required
          >
            {/* <option value="">Select a Category</option> */}
            {category.map((cat, index) => (
              <option key={index} value={cat.title}>
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
            value={blog.description}
            onChange={handleChange}
            style={{ border: "0.001rem solid rgb(113, 113, 113)" }}
            className="form-control"
            id="description"
            rows="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Image" className="form-label">
            <strong>Image</strong>
          </label>
          <input
            type="file"
            name="Image"
            onChange={handleChange}
            className="form-control"
            id="Image"
          />
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
