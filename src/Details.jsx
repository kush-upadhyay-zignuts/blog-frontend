import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useState,useEffect } from "react";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import SpeechDial from "./SpeechDial";

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function Details() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data, error, isLoading } = useSWR(
    `https://blog-backend-1-5vcb.onrender.com/api/${title}`,
    fetcher
  );
    useEffect(() => {
      const loggedInUser = localStorage.getItem("LoggedInUser");
      if (loggedInUser) {
        setUser(loggedInUser);
      }
      const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrolled);
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSignin = () => {
    navigate("/signin");
  };

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4">
        <h1 className="display-4 text-danger mb-4">404 - Not Found</h1>
        <p className="lead">Blog not found or server error!</p>
      </div>
    );
  }

  if (isLoading || !data?.blog) {
    return (
      <>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  const blog = data.blog;

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

       {/* Bootstrap progress bar for scroll */}
       <div className="progress fixed-top" style={user?{top: "63px", height: "5px", zIndex: 1050 } :{top: "56px", height: "5px", zIndex: 1050 }}>
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: `${scrollProgress}%`, transition: "width 0.2s ease-in-out" }}
          aria-valuenow={scrollProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

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

          {/* Render description with formatting */}
          <div className="container my-5">
            <h1 className="mb-4">{blog.title}</h1>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {user && blog.description }
              {!user && <>
                   <p>{blog.description.slice(0,blog.description.length/3)}</p>
              
                  <div className="container my-5">
                  <div className="card shadow-lg p-4 text-center">
                    <h4 className="mb-3">Want to read the full blog on <span className="text-info">StoryHaven</span>?</h4>
                    <p className="text-muted">Please sign in to continue reading.</p>

                    <div className="d-flex justify-content-center gap-3 mt-4">
                    <button onClick={handleSignin} className="btn btn-info text-white px-4">
                        Sign In
                        </button>
                      <button
                        className="btn btn-outline-secondary px-4"
                        onClick={handleGoBack} // or any cancel logic
                        >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <p style={{filter: "blur(4px)"}}>{blog.description.slice(blog.description.length/3,blog.description.length/2)}......</p>
            </>
          }
   


            </div>
          </div>
        </div>
      </div>
      {user && <SpeechDial text={blog.description} />
      }
    </>
  );
}
