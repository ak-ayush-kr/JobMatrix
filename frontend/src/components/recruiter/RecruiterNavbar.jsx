import { useNavigate } from "react-router-dom";

const RecruiterNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow">
      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/recruiter/dashboard")}
      >
        JobMatrix
      </h1>

      <div className="flex gap-6">
        <span onClick={() => navigate("/recruiter/dashboard")} className="cursor-pointer">Home</span>
        <span onClick={() => navigate("/recruiter/my-companies")} className="cursor-pointer">My Companies</span>
        <span onClick={() => navigate("/recruiter/my-jobs")} className="cursor-pointer">My Jobs</span>
      </div>

      <div className="flex gap-4">
        <span onClick={() => navigate("/profile")} className="cursor-pointer">My Profile</span>
        <span onClick={() => navigate("/")} className="text-red-500 cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default RecruiterNavbar;