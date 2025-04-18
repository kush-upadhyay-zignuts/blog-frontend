import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("LoggedInUser")); // assuming this is stored as JSON

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const response = await axios.get(`/api/saved-blogs?userId=${user?._id}`);
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching saved blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSavedBlogs();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="text-center mt-5">Loading saved blogs...</div>;

  if (!user) return <div className="text-center mt-5 text-danger">Please log in to view your saved blogs.</div>;

  if (blogs.length === 0) return <div className="text-center mt-5">You haven't saved any blogs yet.</div>;

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 text-info">Your Saved Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-6 col-lg-4 mb-4" key={blog._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text text-truncate">{blog.content}</p>
                <a href={`/blog/${blog._id}`} className="btn btn-info mt-auto">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedBlogs;
