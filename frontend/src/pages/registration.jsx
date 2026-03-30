import React from 'react'
import { useState, useRef } from 'react'
import { User, Mail, Lock, Phone, Eye, EyeOff, Upload,Briefcase, Building2, CheckCircle2, Loader2, ArrowRight, Axis3DIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Registration() {
    const fileRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handlePhoto = (file) => {
        setPhoto(file); 
        setPhotoPreview(URL.createObjectURL(file)); // preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("phoneNumber", phone);
        formdata.append("role", role);
        if(photo) formdata.append("profilePhoto", photo);

        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                body: formdata,
            });
            const data = await res.json();
            console.log(data);
            console.log("succefully created");
            if(res.ok){
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error);
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
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">Create Your Account</h1>
                        <p className="text-slate-500 text-sm">Join JobMatrix and start your career journey</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Full Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                                        <User size={17} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Rahul Sharma"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 "border-slate-200 hover:border-slate-300`}
                                    />
                                </div>
                            </div>

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
                        </div>

                   
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                            {/* Phone */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                                        <Phone size={17} />
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 border-slate-200 hover:border-slate-300`}
                                    />
                                </div>
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

                        {/* ── Profile Photo ── */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-700">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 bg-slate-50 cursor-pointer hover:border-blue-400 transition-colors"
                                    onClick={() => fileRef.current.click()}
                                >
                                    {photoPreview
                                        ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                                        : <User size={22} className="text-slate-400" />
                                    }
                                </div>
                                <div
                                    onClick={() => fileRef.current.click()}
                                    className={`flex-1 border-2 border-dashed rounded-xl py-4 px-4 text-center cursor-pointer transition-all duration-200
                    "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`}
                                >
                                    <Upload size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-slate-500 text-xs">
                                        <span className="text-blue-600 font-semibold">Click to upload</span>
                                    </p>
                                </div>
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e.target.files[0])} />
                            </div>
                        </div>

                        {/* ── Submit ── */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? <><Loader2 size={16} className="animate-spin" /> Creating Account…</>
                                : <>Sign Up <ArrowRight size={16} /></>
                            }
                        </button>

                        {/* ── Login link ── */}
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <span className="text-blue-600 font-semibold hover:underline cursor-pointer">Login</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;