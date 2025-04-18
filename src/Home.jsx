// import { useEffect,useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import './index.css'
// import LeftMenu from "./LeftMenu";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// function Home() {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen,SetIsOpen] = useState(false)
//   const [user, setUser] = useState(""); // Assume you will fetch user info separately
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(true);

//   const autocompleteRef = useRef(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch('https://blog-backend-1-5vcb.onrender.com/api/blogs');
//         // const res = await fetch('/api/blogs');
        
      
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         setBlogs(data.blogs);
//         setFilteredBlogs(data.blogs);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching blogs:', err.message);
//       }
//     };
  
//     fetchBlogs();
//   }, []);
//   useEffect(() => {
//     // Event listener to detect clicks outside of the autocomplete suggestions
//     const handleClickOutside = (event) => {
//       if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
//         SetIsOpen(false); // Close the suggestions if clicked outside
//       }
//     };

//     // Add event listener for mouse clicks
//     document.addEventListener("mousedown", handleClickOutside);

//     // Clean up the event listener on component unmount
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//    useEffect(() => {
//         const loggedInUser = localStorage.getItem("LoggedInUser");
        
//         if (loggedInUser) {
//           setUser(loggedInUser);
//         }
//       }, []);


  
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
//     SetIsOpen(true);

//     if (value) {
//       const results = blogs.filter((blog) =>
//         blog.title.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredBlogs(results);
//     } else {
//       setFilteredBlogs(blogs);
//     }
//   };

//   const handleSelectSuggestion = (title) => {
//     setInput(title);
//     SetIsOpen(false)
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (input) {
//       // window.location.href = `/${input}`;
//       navigate(`/${input}`)
//     }
//   };

//   // if (loading) {
//   //   return (
//   //     <div className="d-flex align-items-center justify-content-center min-vh-100">
//   //       <div className="spinner-border text-info" role="status">
//   //         <span className="visually-hidden">Loading...</span>
//   //       </div>
//   //     </div>
//   //   );
//   // }


//   if (!blogs) {
//     return (
//       <div className="d-flex align-items-center justify-content-center min-vh-100">
//         <div className="h4">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar fixed-top navbar-expand-lg nav-color">
//         <div className="container-fluid">
//           <a className="navbar-brand text-info" href="#">
//             StoryHaven
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <div className="d-flex flex-column">
//                 <form
//                   className="d-flex search"
//                   autoComplete="off"
//                   id="search-form"
//                   onSubmit={handleSearchSubmit}
//                 >
//                   <input
//                     id="search"
//                     className="form-control me-2"
//                     type="search"
//                     placeholder="Search By Title"
//                     aria-label="Search"
//                     value={input}
//                     onChange={handleInputChange}
//                   />
//                   <button
//                     id="search-btn"
//                     className="btn btn-outline-success text-light"
//                     type="submit"
//                   >
//                     Search
//                   </button>
//                 </form>

//                 {/* Autocomplete Suggestions */}
//                 {isOpen && (
//                   <ul id="autocomplete" className="autocomplete overflow-auto"  ref={autocompleteRef} style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", borderRadius: "4px" }}>
//                     {filteredBlogs.map((blog, idx) => (
//                       <li
//                         key={idx}
//                         onClick={() => handleSelectSuggestion(blog.title)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {blog.title}
                      
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </ul>

//             {/* Login/Logout Dropdown */}
//                       <div className="d-flex align-items-center ms-auto me-2">
//   <div id="nav-dropdown" className="dropdown bg-transparent">
//     {!user ? (
//       <button
//         id="nav-dropdown-button"
//         className="btn text-white dropdown-toggle me-2"
//         type="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         Login
//       </button>
//     ) : (
//       <div
//         id="nav-dropdown-button"
//         type="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//         className="d-flex align-items-center justify-content-center dropdown-toggle btn rounded-circle bg-info text-white me-2"
//         style={{
//           width: "50px",
//           height: "50px",
//           fontSize: "25px",
//           fontWeight: "bold",
//         }}
//       >
//         {user.trim().charAt(0).toUpperCase()}
//       </div>
//     )}
//     <ul className="dropdown-menu" >
//       {user ? (
//         <li><a className="dropdown-item px-0" href="/logout">Logout</a></li>
//       ) : (
//         <>
//           <li><a className="dropdown-item px-0" href="/signup">Sign up</a></li>
//           <li><a className="dropdown-item px-0" href="/signin">Sign in</a></li>
//         </>
//       )}
//     </ul>
//   </div>
// </div>
//           </div>
//         </div>
//       </nav>

//     <LeftMenu/>
//       {/* Left menu include (You can make it another component if needed) */}
//       {/* <LeftMenu /> */}

//       {/* Blog List */}


//       {loading &&  <div className="d-flex align-items-center justify-content-center min-vh-100">
//         <div className="spinner-border text-info" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>}
//       <div className="container " style={{marginTop:"6rem"}}>
//         {blogs.map((blog, idx) => (
//           <Link
//             to={`/${blog.title}`}
//             key={idx}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//              <div key={idx} style={{ textDecoration: "none", color: "inherit" }} >

          
//             <div
//               className="d-flex mt-4 mx-auto align-items-center px-5"
//               style={{ width: "80rem" }}
//             >
//               <img
//                 // src={`https://blog-backend-1-5vcb.onrender.com${blog.imgUrl}`}
//                 src={blog.imgUrl}
//                 className="card-img-top"
//                 style={{ width: "20rem", height: "15rem" }}
//                 alt={blog.title}
//               />
//               <div className="card-body ms-5" style={{ width: "50rem" }}>
//                 <h5 className="card-title">{blog.title}</h5>
//                 <p className="card-text red overflow-hidden">{blog.description}</p>
//                 <p>{new Date(blog.createdAt).toString().slice(0, 25)}</p>
//               </div>
//             </div>
//             </div> 
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;



// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useSWR from "swr";
// import "./index.css";
// import LeftMenu from "./LeftMenu";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// function Home() {
//   const { data, error, isLoading } = useSWR(
//     "https://blog-backend-1-5vcb.onrender.com/api/blogs",
//     fetcher
//   );

//   const blogs = data?.blogs || [];

//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState("");
//   const autocompleteRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (blogs.length) {
//       setFilteredBlogs(blogs);
//     }
//   }, [blogs]);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("LoggedInUser");
//     if (loggedInUser) {
//       setUser(loggedInUser);
//     }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
//     setIsOpen(true);

//     if (value) {
//       const results = blogs.filter((blog) =>
//         blog.title.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredBlogs(results);
//     } else {
//       setFilteredBlogs(blogs);
//     }
//   };

//   const handleSelectSuggestion = (title) => {
//     setInput(title);
//     setIsOpen(false);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (input) {
//       navigate(`/${input}`);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="d-flex align-items-center justify-content-center min-vh-100">
//         <div className="spinner-border text-info" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="d-flex align-items-center justify-content-center min-vh-100">
//         <div className="h4">Failed to load blogs.</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar fixed-top navbar-expand-lg nav-color">
//         <div className="container-fluid">
//           <a className="navbar-brand text-info" href="#">
//             StoryHaven
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <div className="d-flex flex-column">
//                 <form
//                   className="d-flex search"
//                   autoComplete="off"
//                   id="search-form"
//                   onSubmit={handleSearchSubmit}
//                 >
//                   <input
//                     id="search"
//                     className="form-control me-2"
//                     type="search"
//                     placeholder="Search By Title"
//                     aria-label="Search"
//                     value={input}
//                     onChange={handleInputChange}
//                   />
//                   <button
//                     id="search-btn"
//                     className="btn btn-outline-success text-light"
//                     type="submit"
//                   >
//                     Search
//                   </button>
//                 </form>

//                 {isOpen && (
//                   <ul
//                     id="autocomplete"
//                     className="autocomplete overflow-auto"
//                     ref={autocompleteRef}
//                     style={{
//                       maxHeight: "200px",
//                       overflowY: "auto",
//                       border: "1px solid #ccc",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     {filteredBlogs.map((blog, idx) => (
//                       <li
//                         key={idx}
//                         onClick={() => handleSelectSuggestion(blog.title)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {blog.title}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </ul>

//             <div className="d-flex align-items-center ms-auto me-2">
//               <div id="nav-dropdown" className="dropdown bg-transparent">
//                 {!user ? (
//                   <button
//                     id="nav-dropdown-button"
//                     className="btn text-white dropdown-toggle me-2"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Login
//                   </button>
//                 ) : (
//                   <div
//                     id="nav-dropdown-button"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     className="d-flex align-items-center justify-content-center dropdown-toggle btn rounded-circle bg-info text-white me-2"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       fontSize: "25px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {user.trim().charAt(0).toUpperCase()}
//                   </div>
//                 )}
//                 <ul className="dropdown-menu">
//                   {user ? (
//                     <li>
//                       <a className="dropdown-item px-0" href="/logout">
//                         Logout
//                       </a>
//                     </li>
//                   ) : (
//                     <>
//                       <li>
//                         <a className="dropdown-item px-0" href="/signup">
//                           Sign up
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item px-0" href="/signin">
//                           Sign in
//                         </a>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <LeftMenu />

//       <div className="container" style={{ marginTop: "6rem" }}>
//         {blogs.map((blog, idx) => (
//           <Link
//             to={`/${blog.title}`}
//             key={idx}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <div className="d-flex mt-4 mx-auto align-items-center px-5" style={{ width: "80rem" }}>
//               <img
//                 src={blog.imgUrl}
//                 className="card-img-top"
//                 style={{ width: "20rem", height: "15rem" }}
//                 alt={blog.title}
//               />
//               <div className="card-body ms-5" style={{ width: "50rem" }}>
//                 <h5 className="card-title">{blog.title}</h5>
//                 <p className="card-text red overflow-hidden">{blog.description}</p>
//                 <p>{new Date(blog.createdAt).toString().slice(0, 25)}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import "./index.css";
import LeftMenu from "./LeftMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const PAGE_SIZE = 5;

const fetcher = (url) => fetch(url).then((res) => res.json());

function Home() {
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const [input, setInput] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const saveToBookmarks = (blogTitle) => {
    const currentUser = localStorage.getItem("LoggedInUser");
    if (!currentUser) return;
  
    const key = `bookmarks_${currentUser}`;
    let updatedBookmarks = JSON.parse(localStorage.getItem(key)) || [];
  
    if (!updatedBookmarks.includes(blogTitle)) {
      updatedBookmarks.push(blogTitle);
      localStorage.setItem(key, JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    }
  };
  
  const removeFromBookmarks = (blogTitle) => {
    const currentUser = localStorage.getItem("LoggedInUser");
    if (!currentUser) return;
  
    const key = `bookmarks_${currentUser}`;
    let updatedBookmarks = JSON.parse(localStorage.getItem(key)) || [];
  
    updatedBookmarks = updatedBookmarks.filter((title) => title !== blogTitle);
    localStorage.setItem(key, JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };
  
  const isBookmarked = (blogTitle) => {
    return bookmarks.includes(blogTitle);
  };
  
  
  // Infinite scroll logic
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.blogs.length === 0) return null;
    return `https://blog-backend-1-5vcb.onrender.com/api/blogs?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
  };
  
  const { data, size, setSize, isLoading, error } = useSWRInfinite(getKey, fetcher);
  const { ref, inView } = useInView();

   useEffect(() => {
        const handleStorageChange = () => {
          const loggedInUser = localStorage.getItem("LoggedInUser");
          if (loggedInUser) {
            setUser(loggedInUser);
          }
        };
      
        window.addEventListener("storage", handleStorageChange);
      
        // Optional: Also update state right away
        handleStorageChange();
      
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);
  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const currentUser = localStorage.getItem("LoggedInUser");
    if (currentUser) {
      const key = `bookmarks_${currentUser}`;
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      setBookmarks(saved);
    }
  }, []);
  
  const blogs = data ? data.flatMap((page) => page.blogs) : [];
  const isReachingEnd = data && data[data.length - 1]?.hasMore === false;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsOpen(true);

    if (value) {
      const results = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBlogs(results);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  const handleSelectSuggestion = (title) => {
    setInput(title);
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (input) {
      navigate(`/${input}`);
    }
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="h4">Failed to load blogs.</div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar fixed-top navbar-expand-lg nav-color">
        <div className="container-fluid">
          <a className="navbar-brand text-info" href="#">StoryHaven</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="d-flex flex-column">
                <form
                  className="d-flex search"
                  autoComplete="off"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search By Title"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <button className="btn btn-outline-success text-light" type="submit">
                    Search
                  </button>
                </form>

                {isOpen && (
                  <ul
                    className="autocomplete overflow-auto"
                    ref={autocompleteRef}
                    style={{
                      maxHeight: "200px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {filteredBlogs.map((blog, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelectSuggestion(blog.title)}
                        style={{ cursor: "pointer" }}
                      >
                        {blog.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ul>

            <div className="d-flex align-items-center ms-auto me-2">
              <div className="dropdown bg-transparent">
                {!user ? (
                  <button className="btn text-white dropdown-toggle me-2" data-bs-toggle="dropdown">
                    Login
                  </button>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center dropdown-toggle btn rounded-circle bg-info text-white me-2"
                    data-bs-toggle="dropdown"
                    style={{ width: "50px", height: "50px", fontSize: "25px", fontWeight: "bold" }}
                  >
                    {user.trim().charAt(0).toUpperCase()}
                  </div>
                )}
                <ul className="dropdown-menu">
                  {user ? (
                    <li><a className="dropdown-item px-0" href="/logout">Logout</a></li>
                  ) : (
                    <>
                      <li><a className="dropdown-item px-0" href="/signup">Sign up</a></li>
                      <li><a className="dropdown-item px-0" href="/signin">Sign in</a></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LeftMenu />

        <div className="container" style={{ marginTop: "6rem" }}>
  {blogs.map((blog, idx) => (
    
    <div
      className="d-flex mt-4 mx-auto align-items-center px-5"
      style={{ width: "80rem" }}
      key={idx}
    >
      <Link
        to={`/${blog.title}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={blog.imgUrl}
          className="card-img-top"
          style={{ width: "20rem", height: "15rem" }}
          alt={blog.title}
        />

      </Link>
      <div className="card-body ms-5" style={{ width: "50rem" }}>
      <Link
        to={`/${blog.title}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text red overflow-hidden">{blog.description}</p>
        <p>{new Date(blog.createdAt).toString().slice(0, 25)}</p>
        </Link>

      {  user &&(isBookmarked(blog.title) ? (
            <div className="d-flex gap-3 mt-2">
              <button className="btn btn-sm btn-success" disabled>
               Saved
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromBookmarks(blog.title)}
              >
                Unsave
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-outline-info mt-2"
              onClick={() => saveToBookmarks(blog.title)}
            >
              Save for Later
            </button>
          ))}
      </div>
    </div>
  ))}
</div>

        <div ref={ref} className="text-center py-4">
          {isReachingEnd ? (
            <p>No more blogs to load.</p>
          ) : (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading more...</span>
            </div>
          )}
        </div>
      </div>
   
  );
}

export default Home;
