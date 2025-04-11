import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://blog-backend-1-5vcb.onrender.com/api/feedback', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Feedback submitted successfully!");
            setTimeout(() => {
                navigate(-1); // or wherever you want after success
            }, 2000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error("Failed to submit feedback!");
        }
    };

    return (
        <>
            <Navbar />
            <button
                onClick={handleGoBack}
                className="btn btn-light position-absolute top-0.5 m-3 border-0 fs-3"
                style={{ left: "50px", top: "60px" }}
            >
                &larr;
            </button>

            <div className="mx-auto" style={{ width: '40rem', marginTop: "5rem" }}>
                <form onSubmit={handleSubmit} className="mx-auto">
                    <h1 className="mb-4">Submit Feedback</h1>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                            <strong>Subject</strong>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control"
                            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
                            required
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                            <strong>Message</strong>
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            style={{ border: '0.001rem solid rgb(113, 113, 113)' }}
                            required
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '6rem' }}>
                        Submit
                    </button>
                </form>

                <br />

                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary"
                    style={{ width: '6rem' }}
                >
                    Cancel
                </button>

                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </>
    );
};

export default Feedback;
