import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-6 py-4 shadow bg-white/90 w-full">
            <div className="flex">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm mr-2">
                    <Briefcase size={14} className="text-white"/>
                </div>
                <div>
                <h1
                    className="font-bold text-xl cursor-pointer text-gray-900"
                    onClick={() => navigate("/recruiter/dashboard")}
                >
                    Job<span className="text-blue-600">Matrix</span>
                </h1>
                </div>
            </div>
            <div className="flex gap-6 text-gray-900 font-semibold">
                <span onClick={() => navigate("/recruiter/dashboard")} className="cursor-pointer hover:text-blue-800">Home</span>
                <span onClick={() => navigate("/recruiter/my-companies")} className="cursor-pointer hover:text-blue-800">My Companies</span>
                <span onClick={() => navigate("/recruiter/my-jobs")} className="cursor-pointer hover:text-blue-800">My Jobs</span>
            </div>

            <div className="flex gap-4">
                <button onClick={() => navigate("/profile")} className="cursor-pointer text-md font-semibold bg-blue-100 p-2 text-blue-800 rounded-xl">My Profile</button>
                <button onClick={() => navigate("/")} className="text-red-600 cursor-pointer text-md font-semibold bg-red-100 p-2 rounded-xl">Logout</button>
            </div>
        </div>
    );
};

export default RecruiterNavbar;