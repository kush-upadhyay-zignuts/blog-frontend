// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logoutUser = async () => {
//       try {
//         await axios.get('/api/logout', { withCredentials: true }); // include cookies
//         localStorage.removeItem("LoggedInUser");
//         navigate('/blogs'); // After logout, navigate to home page
//       } catch (error) {
//         console.error('Error during logout:', error);
//       }
//     };

//     logoutUser();
//   }, [navigate]);

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <h3>Logging out...</h3>
//     </div>
//   );
// };

// export default Logout;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true); // show modal when component mounts

  const handleLogout = async () => {
    try {
      await axios.get('https://blog-backend-1-5vcb.onrender.com/api/logout', { withCredentials: true });
      localStorage.removeItem("LoggedInUser");
      localStorage.removeItem("CurrentUserRole");
      navigate('/blogs');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate('/blogs'); // if cancelled, send back to blogs page
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback content while modal is showing */}
      {!showModal && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <h3>Redirecting...</h3>
        </div>
      )}
    </>
  );
};

export default Logout;

