// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import './index.css'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// export default function Details() {
//   const { title } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//       async function fetchBlog() {
//           try {
//               const res = await axios.get(`/api/${title}`, {
//                   withCredentials: true,
//                 });
              
//         setBlog(res.data.blog);
//       } catch (err) {
//         console.error("Error fetching blog:", err);
//         setError("Blog not found or server error!");
//       }
//     }
//     fetchBlog();
//   }, [title]);


//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
//         <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Not Found</h1>
//         <p className="text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-2xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="max-w-4xl mx-auto text-start">
//         <p className="text-gray-500 text-sm mb-2">
//           {new Date(blog.createdAt).toString().slice(0, 25)}
//         </p>
//         <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>
//         <img
//           src={`http://localhost:5000${blog.imgUrl}`}
//           alt={blog.title}
//           className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-6"
//         />
//         <div className="prose prose-lg max-w-none">
//           <div dangerouslySetInnerHTML={{ __html: blog.description }} />
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`https://blog-backend-1-5vcb.onrender.com/api/${title}`, {
          withCredentials: true,
        });
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found or server error!");
      }
    }
    fetchBlog();
  }, [title]);

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
        <h1 className="display-4 text-danger mb-4">404 - Not Found</h1>
        <p className="lead">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="h4">Loading...</div>
      </div>
    );
  }

  return (
    <> 
    <Navbar/>
    <button
        onClick={handleGoBack}
        className="btn btn-light position-absolute  m-3 border-0 fs-3"
        style={{ left: "50px", top:"60px" }}
      >
          &larr;
      </button>
      {/* <div className="mx-auto  text-center" style={{ width: "80rem", marginTop:"5rem" }}>
        <div className="mx-auto text-start" style={{ width: "50rem" }}>
          <p className="mt-3">
            {new Date(blog.createdAt).toString().slice(0, 25)}
          </p>
          <h1 className="mt-3">{blog.title}</h1>
          <img
            src={`http://localhost:5000${blog.imgUrl}`}
            className="mt-3"
            style={{ width: "50rem", height: "30rem", objectFit: "cover" }}
            alt={blog.title}
          />
          <div className="mt-3" style={{ width: "50rem" }}>
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          </div>
        </div>
      </div> */}
      <div className="mx-auto text-center" style={{ width: "80rem", marginTop: "5rem" }}>
  <div className="mx-auto text-start" style={{ width: "50rem" }}>
    <p className="mt-3">
      {new Date(blog.createdAt).toString().slice(0, 25)}
    </p>
    <h1 className="mt-3">{blog.title}</h1>
    <img
      src={blog.imgUrl}
      className="mt-3"
      style={{ width: "50rem", height: "30rem", objectFit: "cover" }}
      alt={blog.title}
    />
    
    {/* Updated content rendering */}
    <div className="container my-5">
      <h1 className="mb-4">{blog.title}</h1>
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.8' }}>
        {blog.description}
      </div>
    </div>

  </div>
</div>

    </>
  );
}
