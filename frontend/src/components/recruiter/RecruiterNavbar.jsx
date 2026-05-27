import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authslice";

const RecruiterNavbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navitem = [
    { label: "Home",path:"/recruiter/dashboard"},
    { label: "My Companies",path:"/recruiter/my-companies"},
    { label: "My Jobs", path:"/recruiter/my-jobs"},
  ]

  const dispatch = useDispatch();
  const handleLogout = async()=>{
    console.log("logout function called");
    const result = await fetch("http://localhost:5000/api/users/logout",{
        method:"GET",
        credentials:"include",
    });
    if(result.ok){
        console.log("logging out");
        dispatch(logoutUser());
        navigate("/");
    }
    else{
        console.log("logout error",result);
    }
  }
  return (
    <div className="relative bg-white">
    <div className="flex justify-between items-center px-6 py-4 shadow bg-white/90">
        <div className="flex">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm mr-2">
            <Briefcase size={14} className="text-white" />
        </div>
        <h1
            className="font-bold text-xl cursor-pointer text-gray-900"
            onClick={() => navigate("/recruiter/dashboard")}
        >
            Job<span className="text-blue-800">Matrix</span>
        </h1>
      </div>

      <div className="hidden md:flex gap-6 text-gray-900 font-semibold">
        <span onClick={() => navigate("/recruiter/dashboard")} className="cursor-pointer hover:text-blue-900">Home</span>
        <span onClick={() => navigate("/recruiter/my-companies")} className="cursor-pointer hover:text-blue-900">My Companies</span>
        <span onClick={() => navigate("/recruiter/my-jobs")} className="cursor-pointer hover:text-blue-900">My Jobs</span>
      </div>

      <div className="flex gap-4">
        <button onClick={handleLogout} className="text-red-500 cursor-pointer p-2 bg-red-100 rounded-md">Logout</button>
        <span onClick={()=> setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">☰</span>
      </div>
    </div>

    {mobileMenuOpen && (
        <div className="md:hidden border-t absolute top-full left-0 w-full bg-white border-gray-100 px-4 py-3 flex flex-col gap-1 text-center z-10">
            {navitem.map((item) => (
            <button
              key={item.label}
              onClick={() => {setMobileMenuOpen(false); navigate(item.path); }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-gray-950"
            >
              {item.label}
            </button>
          ))}
        </div>
    )}
    </div>
  );
};

export default RecruiterNavbar;