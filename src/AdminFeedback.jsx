import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1);
      };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('https://blog-backend-1-5vcb.onrender.com/api/feedback'); // <-- API endpoint\
                console.log(response.data)
                setFeedbacks(response.data);
            } catch (error) {
                console.log('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Navbar />
            <button
         onClick={handleGoBack}
         className="btn btn-light position-absolute top-0.5  m-3 border-0 fs-3"
         style={{ left: "50px", top:"60px" }}
       >
            &larr;
       </button>
            <div className="container " style={{marginTop:"5rem"}}>
                <h1 className="mb-4 text-center">User Feedbacks</h1>

                {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                      <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                    <div className="row">
                        {feedbacks.length === 0 ? (
                            <div className="text-center">No feedbacks available.</div>
                        ) : (
                            feedbacks.map((feedback) => (
                                <div className="col-md-6 col-lg-4 mb-4" key={feedback._id}>
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{feedback.subject}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                From: {feedback.name}
                                            </h6>
                                            <p className="card-text">{feedback.message}</p>
                                            <div className="mt-auto">
                                                <hr />
                                                <small className="text-muted">
                                                    Email: {feedback.email}<br />
                                                    Date: {formatDate(feedback.createdAt)}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminFeedback;
