import { useState, useRef,useEffect } from "react";
import { useSelector } from "react-redux";
import {
  User, Mail, Phone, FileText, Upload, X, Plus,
  Save, ArrowLeft, Camera, Briefcase, CheckCircle, AlertCircle, Paperclip
} from "lucide-react";

function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });

  const {user,isAuthenticated} = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState(["Figma", "React", "UX Research", "Tailwind CSS", "Prototyping"]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef();
  const resumeInputRef = useRef();

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
      });

      setSkills(user.profile?.skills || []);
      setProfileImg(user.profile?.profilePhoto || null);
      setResumeFile(user.profile?.resumeName || null);
    }
  }, [user]);

  const validate = () => {
    if (!form.fullName.trim()) return false;
    if (form.fullName.trim().length < 3) return false;
    if (!form.phoneNumber.trim()) return false;
    if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phoneNumber)) return false;
    if (form.bio.length > 400) return false;

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 15) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (s) => setSkills(skills.filter((sk) => sk !== s));

  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if(file) setProfileFile(file); 
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if(file) setResumeName(file.name);
    if (file) setResumeFile(file);
  };

  // func for updating profile of user
  const updateProfile = async () => {
    if (!validate()) {
      setErrors({ form: "Please fix validation errors before saving." });
      return;
    }
    const formData = new FormData();
    formData.append("name", form.fullName);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("bio", form.bio);
    formData.append("skills", JSON.stringify(skills));

    if(profileImg) formData.append("profilePhoto", profileFile);
    if(resumeFile) {
      console.log("resume");
      formData.append("resume", resumeFile);
    }
    
    try {
      const res = await fetch("http://localhost:5000/api/users/updateProfile", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if(res.ok) {
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
        {/* Top Nav */}
        <div className="flex items-center gap-3 mb-8">
          <button className="flex items-center gap-2 text-[#64748b] hover:text-[#94a3b8] text-sm transition-colors duration-150 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-150" />
            Back to Home
          </button>
          <span className="text-[#1e293b]">/</span>
          <span className="text-[#3b82f6] text-sm font-medium">Edit Profile</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1d4ed8]/20 border border-[#3b82f6]/30 flex items-center justify-center">
              <Briefcase size={15} className="text-[#3b82f6]" />
            </div>
            <span className="text-blue-500 text-xs font-bold tracking-widest uppercase ">JobMatrix</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-500 mt-3 leading-tight">Edit Profile</h1>
          <p className="text-[#64748b] text-sm mt-1.5">Update your personal and professional details</p>
        </div>

        {/* Success Toast */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 bg-white border border-[#16a34a]/40 text-[#4ade80] text-sm px-4 py-3 rounded-xl animate-pulse">
            <CheckCircle size={16} />
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* Profile Photo Card */}
        <div className="bg-white border border-[#1e2d45] rounded-2xl p-6 mb-5 backdrop-blur-sm shadow-xl">
          <h2 className="text-gray-700 text-xs font-semibold uppercase tracking-widest mb-5">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-full ring-2 ring-white ring-offset-2 ring-offset-[#2b74fb] overflow-hidden bg-white flex items-center justify-center">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={30} className="text-[#3b82f6]/60" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
              >
                <Camera size={18} className="text-white" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
            <div>
              <p className="text-black text-sm font-medium mb-1">Change your photo</p>
              <p className="text-[#4a5568] text-xs mb-3">JPG, PNG or GIF · Max 5MB</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 border-gray-300 hover:border-[#3b82f6]/60 text-[#60a5fa] text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                <Upload size={13} />
                Upload Photo
              </button>
            </div>
          </div>
        </div>

        {/* Personal Info Card */}
        <div className="bg-white border border-[#1e2d45] rounded-2xl p-6 mb-5 backdrop-blur-sm shadow-xl">
          <h2 className="text-[#333435] text-xs font-semibold uppercase tracking-widest mb-5">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-black text-xs font-medium mb-2">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={"pl-10 border-black p-2 rounded-md w-full bg-gray-100 text-black"}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#94a3b8] text-xs font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                <input
                  name="email"
                  value={form.email}
                  disabled
                  className={`p-2 w-full rounded-md pl-10 border-black bg-gray-200 text-black opacity-50 cursor-not-allowed`}
                />
              </div>
              <p className="text-[#4a5568] text-xs mt-1.5">Email cannot be changed here</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-black text-xs font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full p-2 rounded-md pl-10 border-black bg-gray-100 text-black`}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-black text-xs font-medium">Professional Bio</label>
                <span className={`text-xs ${form.bio.length > 380 ? "text-amber-400" : "text-[#4a5568]"}`}>
                  {form.bio.length}/400
                </span>
              </div>
              <div className="relative">
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell employers about yourself..."
                  className={`w-full rounded-md p-2 pl-10 pt-3 resize-none border-[#1e2d45] bg-gray-100 text-black`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white border border-[#1e2d45] rounded-2xl p-6 mb-5 backdrop-blur-sm shadow-xl">
          <h2 className="text-black text-xs font-semibold uppercase tracking-widest mb-1">Skills</h2>
          <p className="text-black text-xs mb-4">Add up to 15 skills. Press Enter or comma to add.</p>

          <div className="flex gap-2 mb-4">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKey}
              placeholder="e.g. JavaScript, Project Management..."
              className={`w-full rounded-md p-2 text-black bg-gray-100 border-[#1e2d45] flex-1`}
            />
            <button
              onClick={addSkill}
              disabled={!skillInput.trim() || skills.length >= 15}
              className="flex items-center gap-1.5 bg-[#1d4ed8] hover:bg-[#2563eb] disabled:bg-[#1e2d45] disabled:text-[#4a5568] disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 shrink-0"
            >
              <Plus size={15} />
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="group flex items-center gap-1.5 bg-gray-100 border border-[#3b82f6]/25 hover:border-[#3b82f6]/50 text-black text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-[#4a5568] hover:text-red-400 transition-colors duration-150 ml-0.5"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {skills.length === 0 && (
            <p className="text-[#4a5568] text-xs italic">No skills added yet.</p>
          )}
        </div>

        {/* Resume Card */}
        <div className="bg-white border border-[#1e2d45] rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-xl">
          <h2 className="text-black text-xs font-semibold uppercase tracking-widest mb-1">Resume</h2>
          <p className="text-black text-xs mb-5">Upload your latest resume. PDF or DOCX, max 10MB.</p>
          
          <input ref={resumeInputRef} type="file" accept=".pdf" className="hidden" onChange={handleResumeChange} />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => resumeInputRef.current.click()}
              className="flex items-center gap-2.5 bg-white hover:bg-[#e2e4e7] border border-[#1e2d45] hover:border-[#3b82f6]/40 text-[#94a3b8] hover:text-[#60a5fa] text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 w-fit"
            >
              <Upload size={15} />
              Upload Resume
            </button>

            {resumeFile && (
              <div className="flex items-center gap-2.5 bg-white border border-[#16a34a]/25 px-4 py-2.5 rounded-xl">
                <Paperclip size={13} className="text-blue-500 shrink-0" />
                <span className="text-blue-500 text-xs font-medium truncate max-w-[200]">{resumeName}</span>
                <button onClick={() => setResumeFile(null)} className="text-[#4a5568] hover:text-red-400 transition-colors ml-1">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            onClick={updateProfile}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-linear-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50 transition-all duration-200 active:scale-[0.98]"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;