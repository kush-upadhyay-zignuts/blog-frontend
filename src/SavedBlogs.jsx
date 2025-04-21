// import { useEffect, useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Navbar from "./Navbar";
// import { Link, useNavigate } from "react-router-dom";

// const SavedBlogs = () => {
//   const [bookmarkedTitles, setBookmarkedTitles] = useState([]);
//   const navigate = useNavigate();
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);


// //   useEffect(() => {
// //     // Load bookmarks from localStorage
// //     const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
// //     setBookmarkedTitles(saved);
// //   }, []);
// useEffect(() => {
//     const currentUser = localStorage.getItem("LoggedInUser");
//     if (currentUser) {
//       const key = `bookmarks_${currentUser}`;
//       const saved = JSON.parse(localStorage.getItem(key)) || [];
//       setBookmarkedTitles(saved);
//     }
//   }, []);
  

//   useEffect(() => {
//     const fetchAllBlogs = async () => {
//       try {
//         const res = await fetch("https://blog-backend-1-5vcb.onrender.com/api/blogs?page=1&limit=1000");
//         const data = await res.json();
//         setAllBlogs(data.blogs || []);
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error);
//       }
//     };

//     fetchAllBlogs();
//   }, []);
//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     // Filter all blogs by bookmarked titles
//     const matchedBlogs = allBlogs.filter((blog) =>
//       bookmarkedTitles.includes(blog.title)
//     );
//     setFilteredBlogs(matchedBlogs);
//     setLoading(false);
//   }, [bookmarkedTitles, allBlogs]);



//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="d-flex align-items-center justify-content-center min-vh-100">
//           <div className="spinner-border text-info" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!loading && !filteredBlogs) {
//     return (
//       <>
//         <Navbar />
//         <button
//           onClick={handleGoBack}
//           className="btn btn-light position-absolute m-3 border-0 fs-3"
//           style={{ left: "50px", top: "60px" }}
//         >
//           &larr;
//         </button>
//         <div className="d-flex align-items-center justify-content-center min-vh-100">
//           <h4>No saved blogs found.</h4>
//         </div>
//       </>
//     );
//   }
  

//   return (
//     <> 
//     <Navbar />
//     <button
//         onClick={handleGoBack}
//         className="btn btn-light position-absolute m-3 border-0 fs-3"
//         style={{ left: "50px", top: "60px" }}
//       >
//         &larr;
//       </button>
//     <div className="container mt-5 pt-4">
//       <h2 className="mb-4 text-center text-info">Your Saved Blogs</h2>
//       {filteredBlogs.map((blog, idx) => (
//                 <Link
//                   to={`/${blog.title}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   >
//           <div className="card mb-4 shadow-sm" key={idx}>
//           <div className="row g-0">
//             <div className="col-md-4">
//               <img
//                 src={blog.imgUrl}
//                 className="img-fluid rounded-start"
//                 alt={blog.title}
//                 />
//             </div>
//             <div className="col-md-8">
//               <div className="card-body mt-3">
//                   <h5 className="card-title">{blog.title}</h5>
//                 <p className="card-text">{blog.description.slice(0,250)}...</p>
//                 <p className="card-text">
//                   <small className="text-muted">
//                     {new Date(blog.createdAt).toLocaleString()}
//                   </small>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//                 </Link>
//       ))}
//     </div>
//       </>
//   );
// };

// export default SavedBlogs;


import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const SavedBlogs = () => {
  const [bookmarkedTitles, setBookmarkedTitles] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);
  const [blogsLoaded, setBlogsLoaded] = useState(false);


  useEffect(() => {
    const currentUser = localStorage.getItem("LoggedInUser");
    if (currentUser) {
      const key = `bookmarks_${currentUser}`;
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      setBookmarkedTitles(saved);
    }
     setBookmarksLoaded(true);
  }, []);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await fetch(
          "https://blog-backend-1-5vcb.onrender.com/api/blogs?page=1&limit=1000"
        );
        const data = await res.json();
        setAllBlogs(data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }finally {
        setBlogsLoaded(true); // ✅ Mark done
      }
      };  

    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (bookmarkedTitles.length === 0 && allBlogs.length === 0) return;

    // Filter only after both bookmarks and blogs are available
    const matchedBlogs = allBlogs.filter((blog) =>
      bookmarkedTitles.includes(blog.title)
    );
    setFilteredBlogs(matchedBlogs);

  }, [bookmarkedTitles, allBlogs]);

  const handleGoBack = () => {
    navigate(-1);
  };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="d-flex align-items-center justify-content-center min-vh-100">
//           <div className="spinner-border text-info" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (filteredBlogs.length === 0) {
//     return (
//       <>
//         <Navbar />
//         <button
//           onClick={handleGoBack}
//           className="btn btn-light position-absolute m-3 border-0 fs-3"
//           style={{ left: "50px", top: "60px" }}
//         >
//           &larr;
//         </button>
//         <div className="d-flex align-items-center justify-content-center min-vh-100">
//           <h4>No saved blogs found.</h4>
//         </div>
//       </>
//     );
//   }
      const loading = !bookmarksLoaded || !blogsLoaded;

  return (
    <>
      <Navbar />
      <button
        onClick={handleGoBack}
        className="btn btn-light position-absolute m-3 border-0 fs-3"
        style={{ left: "50px", top: "60px" }}
      >
        &larr;
      </button>
        {loading &&      <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> }
        {!loading && filteredBlogs.length === 0 && <div className="d-flex align-items-center justify-content-center min-vh-100">
           <h4>No saved blogs found.</h4>

        </div>}
      {!loading && filteredBlogs.length > 0 && (
      <div className="container mt-5 pt-4">
        <h2 className="mb-4 text-center text-info">Your Saved Blogs</h2>
        {filteredBlogs.map((blog, idx) => (
          <Link
            to={`/${blog.title}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={idx}
          >
            <div className="card mb-4 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={blog.imgUrl}
                    className="img-fluid rounded-start"
                    alt={blog.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body mt-3">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">
                      {blog.description.slice(0, 250)}...
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {new Date(blog.createdAt).toLocaleString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
        )}
      
    </>
  );
};

export default SavedBlogs;
