// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import LeftMenu from "./LeftMenu";
// import './index.css'; // (Assuming your head-data, body-data styles are in index.css)
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// export default function AdminAllBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const res = await axios.get(' https://blog-backend-1-5vcb.onrender.com/api/admin/blogs', { withCredentials: true });
//         setBlogs(res.data); // assuming backend sends { blogs: [...] }
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError("Failed to load blogs");
//       }
//     }
//     fetchBlogs();
//   }, []);

//   if (error) {
//     return (
//       <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
//         <h1 className="display-4 text-danger mb-4">Error</h1>
//         <p className="lead">{error}</p>
//       </div>
//     );
//   }

//   // if (blogs.length === 0) {
//   //   return (
//   //     <div className="d-flex align-items-center justify-content-center min-vh-100">
//   //       <div className="h4">Loading...</div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div>
//       {/* Assuming leftmenu would be a separate component */}
//       <Navbar/>
//       <LeftMenu /> 


//       <table id="blog-table" className=" mx-auto" style={{marginTop:"5rem"}}>
//         <thead>
//           <tr id="blog-head-row">
//             <th className="head-data">Name/Title</th>
//             <th className="head-data">Category</th>
//             <th className="head-data">Description</th>
//             <th className="head-data">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.map((blog, index) => (
//             <tr key={blog._id} id="blog-body-row">
//               <td className="body-data">{blog.title}</td>
//               <td className="body-data">{blog.category}</td>
//               <td className="body-data">{blog.description}</td>
//               <td className="body-data">
//                 &nbsp;&nbsp;&nbsp;
//                 <a href={`/admin/${blog.title}/delete`}>
//                   <i className="fa-regular fa-trash-can"></i>
//                 </a>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <a href={`/admin/${blog.title}/edit`}>
//                   <i className="fa-regular fa-pen-to-square"></i>
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {loading &&  <div className="d-flex align-items-center justify-content-center min-vh-100">
//         <div className="spinner-border text-info" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>}
//     </div>
//   );
// }


import useSWR from "swr";
import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function AdminAllBlogs() {
  const { data, error, isLoading } = useSWR(
    "https://blog-backend-1-5vcb.onrender.com/api/admin/blogs",
    fetcher
  );

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
        <h1 className="display-4 text-danger mb-4">Error</h1>
        <p className="lead">Failed to load blogs</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <LeftMenu />

      {isLoading || !data ? (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table id="blog-table" className="mx-auto" style={{ marginTop: "5rem" }}>
          <thead>
            <tr id="blog-head-row">
              <th className="head-data">Name/Title</th>
              <th className="head-data">Category</th>
              <th className="head-data">Description</th>
              <th className="head-data">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((blog) => (
              <tr key={blog._id} id="blog-body-row">
                <td className="body-data">{blog.title}</td>
                <td className="body-data">{blog.category}</td>
                <td className="body-data">{blog.description}</td>
                <td className="body-data">
                  &nbsp;&nbsp;&nbsp;
                  <a href={`/admin/${blog.title}/delete`}>
                    <i className="fa-regular fa-trash-can"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href={`/admin/${blog.title}/edit`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
