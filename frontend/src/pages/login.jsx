import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Briefcase, Mail, Lock, Eye, EyeOff, User, Building2, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // function login user and recruiter

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        console.log(data);
        if(res.ok){
            navigate("/");
        }
    }catch (error) {
        console.error("Error logging in:", error);
    }finally {
        setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">

      <div className="w-full md:w-1/2 max-w-5xl  rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/60 bg-blue-500">
        <div className="flex items-center gap-2 mt-6 px-8 mb-4">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <Briefcase size={14} className="text-blue-500" />
          </div>
          <span className="text-base font-bold text-white">JobMatrix</span>
        </div>
        <div className="flex-1 p-8 lg:p-8 overflow-y-auto bg-white">

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Login with JobMatrix</h1>
            <p className="text-slate-500 text-sm">Join JobMatrix and start your career journey</p>
          </div>

          <div className="flex flex-col gap-4">
    


              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    <Mail size={17} />
                  </span>
                  <input
                    type="email"
                    placeholder="rahul@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 "border-slate-200 hover:border-slate-300`}
                  />
                </div>
              
            </div>


          
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    <Lock size={17} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 border-slate-200 hover:border-slate-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

         
          

            {/* ── Role Selection ── */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">I am a…</label>
              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${role === "user" ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <User size={17} />
                  </div>
                  <div>
                    <p className={`hidden sm:flex text-sm font-semibold ${role === "user" ? "text-blue-700" : "text-slate-700"}`}>Job Seeker</p>
                  </div>
                  {role === "user" && <CheckCircle2 size={16} className="text-blue-500 ml-auto       shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${role === "recruiter" ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${role === "recruiter" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <Building2 size={17} />
                  </div>
                  <div>
                    <p className={`hidden sm:flex text-sm font-semibold ${role === "recruiter" ? "text-blue-700" : "text-slate-700"}`}>Recruiter</p>
                  </div>
                  {role === "recruiter" && <CheckCircle2 size={16} className="text-blue-500 ml-auto shrink-0" />}
                </button>

              </div>
            </div>

  
            {/*  form submission button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Logging In…</>
                : <>Login <ArrowRight size={16} /></>
              }
            </button>

            {/* ── for sign up link ── */}
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;