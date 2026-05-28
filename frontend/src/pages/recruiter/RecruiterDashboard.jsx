import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import { Building2, BriefcaseBusiness, Users, Users2 } from "lucide-react";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <><div>
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
      <div className="bg-white p-4">
        <div className="mb-5 text-center text-xl font-bold text-blue-900">Current status of your recruitment</div>
        <div className="flex-row md:flex w-full gap-6">
          <div className="p-3 border-t-4 flex-1 border-blue-700 bg-gray-50 hover:-translate-y-2 transition-all ease-in-out">
            <Building2 className="text-blue-700" />
            <h3 className="text-gray-900 font-semibold">Total company</h3>
            <p className="text-3xl text-blue-700 font-bold">5</p>
          </div>
          <div className="flex-1 p-3 border-t-4 border-orange-400 bg-gray-50 hover:-translate-y-2 transition-all ease-in-out">
            <BriefcaseBusiness className="text-orange-400" />
            <h3 className="text-gray-900 font-semibold">Total Jobs</h3>
            <p className="text-3xl text-orange-400 font-bold">30</p>
          </div>
          <div className="flex-1 p-3 border-t-4 border-green-600 bg-gray-50 hover:-translate-y-2 transition-all ease-in-out">
            <Users2 className="text-green-600" />
            <h3 className="text-gray-900 font-semibold">Total applications</h3>
            <p className="text-3xl text-green-600 font-bold">3000</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="p-4 h-40 w-full text-center relative font-semibold text-blue-700 bg-gray-50 flex flex-col justify-center overflow-hidden rounded-2xl">

          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-black/5" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/5" />
          <div className="absolute top-8 left-8 w-8 h-8 rounded-full bg-black/10" />

          <p className="text-xl md:text-3xl z-10">
            Hire Smarter, Faster, Better.
          </p>

          <p className="text-sm text-gray-400 mt-2 z-10">
            Connect with top talent and streamline your hiring workflow with JobMatrix.
          </p>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterDashboard;