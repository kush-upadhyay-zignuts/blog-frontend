import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("LoggedInUser");
  
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
