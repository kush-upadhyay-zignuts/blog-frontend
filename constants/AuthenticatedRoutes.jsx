import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const token = localStorage.getItem("CurrentUserRole");
  
  return token==="ADMIN" ? <Outlet /> : <Navigate to="/blogs" />;
};

export default AuthenticatedRoutes;
