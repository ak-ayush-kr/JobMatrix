import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "user") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;