import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RecruiterNavbar />

      <div className="bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold">
          Welcome Back, Recruiter 👋
        </h1>

        <p className="mt-3">
          Let’s hire amazing people and build great teams 🚀
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/recruiter/enroll-company")}
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Enroll Company
          </button>

          <button
            onClick={() => navigate("/recruiter/create-job")}
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Create Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;