// import { useState } from "react";
// import { Link } from "react-router-dom";
// import './index.css'
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function LeftMenu() {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(prev => !prev);
//   };

//   return (
//     <div className="left-menu">
//       <div id="checkbox-label" onClick={toggleMenu}>
//         <div className="left-menu-div-1">
//           {open ? (
//             <FaTimes id="cross" className="fa-solid" />
//           ) : (
//             <FaBars id="bars" className="fa-solid" />
//           )}
//         </div>

//         {open && (
//           <div className="left-menu-div-2">
//             <ul className="left-menu-ul">
//               <li><Link to="/user">Home</Link></li>
//               <li><Link to="/user/blogs">All Blogs</Link></li>
//               <li><Link to="/user/blogs/new">Add New Blog</Link></li>
//               <li><Link to="/user/Categories">All Categories</Link></li>
//               <li><Link to="/user/Categories/new">Add New Category</Link></li>
//               <li><a href="/logout">Logout</a></li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./index.css"; // Make sure your CSS is imported
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function LeftMenu() {
  const [open, setOpen] = useState(false);
  const [role,setRole] = useState("");
  const [user,setUser] = useState("")
  const [subscribe, setSubscribe] = useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  // Prevent body scroll when menu is open (matches your .no-scroll class)
  useEffect(() => {
 
      const roles =  localStorage.getItem("CurrentUserRole");
      setRole(roles);
      const users =  localStorage.getItem("LoggedInUser");
      setUser(users)
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [open]);

  return (
    <div className="left-menu fixed-top">
      <div id="checkbox-label" onClick={toggleMenu}>
        <div className="left-menu-div-1">
          {open ? (
            <FaTimes id="cross" className="fa-solid" />
          ) : (
            <FaBars id="bars" className="fa-solid" />
          )}
        </div>
      </div>

      <div className={`left-menu-div-2 ${open ? "open" : ""}`}>
        <ul className="left-menu-ul">
          <li><Link to="/">Home</Link></li>
          <li><a href="/bycategory">Search By Category</a></li>
         {  role === "ADMIN" && <> 
          <li><Link to="/admin/allblogs">All Blogs</Link></li>
          <li><Link to="/admin/blogs/new">Add New Blog</Link></li>
          <li><Link to="/admin/Categories">All Categories</Link></li>
          <li><Link to="/admin/Categories/new">Add New Category</Link></li>
          <li><Link to="/admin/feedbacks">Recieved Feedback</Link></li>
          <li><a href="/savedblogs">Saved Blogs</a></li> </> }

          {role !== "ADMIN" && <li><Link to="/subscribe">{subscribe=== false ? "Subscribe" : "Upgrade Your Plan"}</Link></li>}

         { user &&  role === "NORMAL" && <>
          <li><a href="/Feedback">Feedback</a></li>
          <li><a href="/savedblogs">Saved Blogs</a></li>
         </>
          }
         { user && <li><a href="/logout">Logout</a></li>}
         { !user && <li><a href="/signin">Sign In</a></li>}
        </ul>
      </div>
    </div>
  );
}
