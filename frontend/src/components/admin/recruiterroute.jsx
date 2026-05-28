import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RecruiterRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (user?.role !== "recruiter"  || !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RecruiterRoute;