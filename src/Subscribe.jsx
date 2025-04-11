// import React from "react";

// const Subscribe = () => {
//   const plans = [
//     {
//       duration: "1 Month",
//       price: 40,
//       originalPrice: 60,
//       discount: "33% OFF",
//     },
//     {
//       duration: "6 Months",
//       price: 200,
//       originalPrice: 300,
//       discount: "34% OFF",
//     },
//     {
//       duration: "12 Months",
//       price: 400,
//       originalPrice: 700,
//       discount: "43% OFF",
//     },
//   ];

//   const benefits = [
//     "Access Exclusive Blogs",
//     "Ad-Free Reading Experience",
//     "Early Access to New Content",
//     "Premium Support",
//     "Special Monthly Giveaways",
//     "Access to Subscriber-Only Articles",
//   ];

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Choose Your Subscription</h1>
//       <p style={styles.subtitle}>Unlock premium features and enjoy an enhanced reading experience!</p>

//       <div style={styles.benefitsSection}>
//         <h3>Benefits of Subscription:</h3>
//         <ul>
//           {benefits.map((benefit, idx) => (
//             <li key={idx} style={styles.benefitItem}>{benefit}</li>
//           ))}
//         </ul>
//       </div>

//       <div style={styles.plansContainer}>
//         {plans.map((plan, index) => (
//           <div key={index} style={styles.planCard}>
           
//             <h2>{plan.duration}</h2>
//             <p style={styles.price}>₹{plan.price}</p>
//             <p style={styles.originalPrice}>₹{plan.originalPrice}</p>
//             <p style={styles.discount}>{plan.discount}</p>
//             <button style={styles.subscribeButton}>Subscribe</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "30px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f9f9f9",
//     minHeight: "100vh",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: "32px",
//     marginBottom: "10px",
//   },
//   subtitle: {
//     textAlign: "center",
//     fontSize: "18px",
//     marginBottom: "30px",
//     color: "#555",
//   },
//   benefitsSection: {
//     maxWidth: "600px",
//     margin: "0 auto 40px",
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   benefitItem: {
//     marginBottom: "8px",
//     fontSize: "16px",
//     color: "#333",
//   },
//   plansContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     flexWrap: "wrap",
//   },
//   planCard: {
//     backgroundColor: "#ffffff",
//     padding: "20px",
//     width: "250px",
//     textAlign: "center",
//     borderRadius: "12px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     position: "relative",
//   },
//   price: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     margin: "10px 0",
//   },
//   originalPrice: {
//     textDecoration: "line-through",
//     color: "#999",
//     fontSize: "16px",
//   },
//   discount: {
//     backgroundColor: "#ff4d4f",
//     color: "#fff",
//     padding: "4px 8px",
//     borderRadius: "5px",
//     fontSize: "14px",
//     marginTop: "8px",
//     marginLeft: "50px",
//     marginRight:"50px",
//     display: "inline-block",
//   },
//   subscribeButton: {
//     marginTop: "15px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     cursor: "pointer",
//   }
// };

// export default Subscribe;


import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Subscribe() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    <Navbar/>
      <button
        onClick={handleGoBack}
        className="btn btn-light position-absolute top-1 m-3 border-0 fs-3"
        style={{ left: "50px", top:"60px" }}
      >
          &larr;
      </button>
    <div className="container py-5 position-relative"  style={{ marginTop:"3rem" }}>

      {/* Cross Button */}

      <h1 className="text-center mb-4">Choose Your Subscription</h1>
      <p className="text-center text-muted mb-5">
        Unlock premium features like exclusive blogs, ad-free experience, early access to new blogs, bonus tips, and much more!
      </p>

      <div className="row justify-content-center">

        {/* 1 Month Plan */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">1 Month</h5>
              <h6 className="card-subtitle mb-2 text-muted">₹50</h6>
              <p className="text-success">Limited Time Offer!</p>
              <p className="card-text">✔️ Exclusive blogs <br/>✔️ Ad-free reading <br/>✔️ Bonus resources</p>
              <button 
  className="btn btn-primary mt-2"
  onClick={() => window.location.href = "https://buy.stripe.com/test_eVadTq5vrerhfQc001"}
>
  Subscribe Now
</button>
            </div>
          </div>
        </div>

        {/* 6 Months Plan */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body text-center">
              <h5 className="card-title">6 Months</h5>
              <h6 className="card-subtitle mb-2 text-muted">₹200 <span className="badge bg-success ms-2">17% OFF</span></h6>
              <p className="text-success">Best Value!</p>
              <p className="card-text">✔️ Exclusive blogs <br/>✔️ Ad-free reading <br/>✔️ Early Access <br/>✔️ Bonus tips</p>
              <button 
  className="btn btn-primary mt-2"
  onClick={() => window.location.href = "https://buy.stripe.com/test_aEU2aIaPL5UL8nK4gg"}
>
  Subscribe Now
</button>
            </div>
          </div>
        </div>

        {/* 12 Months Plan */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">12 Months</h5>
              <h6 className="card-subtitle mb-2 text-muted">₹400 <span className="badge bg-success ms-2">33% OFF</span></h6>
              <p className="text-success">Best Deal!</p>
              <p className="card-text">✔️ Exclusive blogs <br/>✔️ Ad-free reading <br/>✔️ Early Access <br/>✔️ VIP Support</p>
              <button 
  className="btn btn-primary mt-2"
  onClick={() => window.location.href = "https://buy.stripe.com/test_7sIdTq7DzdndeM8eUW"}
>
  Subscribe Now
</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default Subscribe;
