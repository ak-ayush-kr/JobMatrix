import React from "react";
import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setJobs } from "../redux/jobslice";



function UserDashboard() {
  const [alljob,setalljob] = useState([]);
  const [activeNav, setActiveNav] = useState("Home");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("user is",user.name);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = alljob.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
  );



  const navItems = [
    { label: "Home", icon: "⊞" },
    { label: "My Jobs", icon: "📁" },
    { label: "All Jobs", icon: "🔍" },
  ];

  

  useEffect(() => {
    const getalljobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/company/getAllJobs", {
          method: "GET",
          credentials:"include",
        });
        if(res.ok){
          const data = await res.json();
          console.log(data.jobs);
          setalljob(data.jobs);
          dispatch(setJobs(data.jobs));
          console.log(alljob);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    getalljobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4ff]" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Briefcase size={14} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                Job<span className="text-blue-600">Matrix</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`nav-link flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeNav === item.label
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                <img src={user?.profilePhoto} alt="profile" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-sm font-medium text-gray-700">{user.name || "User"}</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                <span>↗</span>
                <span className="hidden sm:block">Logout</span>
              </button>
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className="text-gray-600 text-lg">☰</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${activeNav === item.label ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="hero-glow absolute inset-0" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/10">
                <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
                247 new jobs posted today
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                Welcome Back,<br />
                <span className="text-blue-200">{user.name || "User"}! 👋</span>
              </h1>
              <p className="text-blue-200 text-lg mb-6 max-w-lg">
                Your dream role is out there. You're <span className="text-white font-semibold">3 steps away</span> from landing your next opportunity.
              </p>
              {/* Search */}
              <div className="flex gap-2 max-w-xl">
                <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">
                  <span className="text-gray-400 text-lg flex-shrink-0">🔍</span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs, companies..."
                    className="flex-1 text-gray-800 placeholder-gray-400 text-sm font-medium outline-none bg-transparent search-glow"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">✕</button>
                  )}
                </div>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-3 rounded-2xl font-semibold text-sm border border-white/20 transition-all whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* JOB LISTINGS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              {search ? `Results for "${search}"` : "Latest Openings"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 })
            : filtered.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-5xl mb-4">🔎</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">No jobs found</h3>
                  <p className="text-gray-400 text-sm">Currently no jobs exist for your search criteria.</p>
                  <button onClick={() => setSearch("")} className="mt-4 text-blue-600 text-sm font-medium hover:underline">Clear search</button>
                </div>
              )
              : filtered.slice(0, 6).map((alljob, i) => (
                <div
                  key={alljob._id}
                  className="card-hover bg-white rounded-3xl border border-gray-100 shadow-sm cursor-pointer fade-in relative overflow-hidden flex flex-col"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Colored top accent bar */}
                  <div className={`h-1.5 w-full bg-blue-500 opacity-80`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-md`}
                          style={{ fontFamily: "'Sora', sans-serif" }}>
                          {alljob.company.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                            {alljob.title}
                          </h3>
                          <p className="text-blue-600 text-sm font-semibold mt-0.5">{alljob.company.name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta pills row */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full font-medium">
                        📍 {alljob.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full font-semibold">
                        ⏱ {alljob.jobType}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full font-semibold">
                        💰 {alljob.salary}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{alljob.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {alljob.requirements.map((tag) => (
                        <span key={tag} className="tag-pill bg-slate-50 text-slate-600 px-3 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                        Posted {alljob.createdAt ? new Date(alljob.createdAt).toLocaleDateString() : "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/jobdetails/${alljob._id}`)}
                          className={`apply-btn px-5 py-2 rounded-xl text-sm font-semibold transition-all
                           bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 hover:shadow-blue-300 hover:shadow-lg
                            }`}
                        >
                          view more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <Briefcase size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Sora', sans-serif" }}>Job<span className="text-blue-600">Matrix</span></span>
          </div>
          <p className="text-xs text-gray-400">© 2026 JobMatrix · Built for ambitious careers</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserDashboard;