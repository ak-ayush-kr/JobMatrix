import { useState, useEffect, use } from "react";
import { FEATURES, STEPS, NAV_LINKS } from "../data/constants";
import dashimg from "../assets/dashimg.png";
import { useNavigate } from "react-router-dom";



function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating background blobs */}
      <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-cyan-200 rounded-full opacity-30 blur-2xl animate-pulse" style={{animationDelay:"1s"}} />

      <img
        src={dashimg}
        alt="JobMatrix"
        className="relative w-full rounded-3xl shadow-2xl border border-blue-100 object-cover"
      />

         {/* Floating notification cards */}
      <div className="absolute -top-4 -left-4 bg-white border border-blue-100 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-lg">🎉</span> New match found!
      </div>
      <div className="absolute -bottom-4 right-8 bg-white border border-emerald-100 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-lg">✅</span> Applied successfully
      </div>
    </div>
  );
}


function homepage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans" style={{ fontFamily: "'DM Sans', 'Nunito', 'Segoe UI', sans-serif" }}>

        {/* ── NAVBAR ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? "bg-white/90 shadow-sm border-b border-blue-50" : "bg-white/70"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" fill="none" stroke="white" strokeWidth="2"/>
                </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Job<span className="text-blue-600">Matrix</span></span>
            </div>

          {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-3">
                {NAV_LINKS.map(l => (
                <button key={l} className="text-sm text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors btn-ghost">{l}</button>
                ))}
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button className="text-sm font-semibold text-blue-700 border-2 border-blue-200 bg-white px-5 py-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all duration-200" onClick={()=>navigate("/login")}>
                Login
            </button>
            <button className="text-sm font-bold text-white bg-blue-600 px-6 py-2 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-blue-700 transition-colors duration-200" onClick={()=> navigate("/register")}>
                Sign Up
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
            </div>

          {/* Mobile hamburger */}
            <button className="sm:hidden p-4 mr-4" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}/>
                <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}/>
                <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}/>
            </button>
            </div>

        {/* Mobile menu */}
        {menuOpen && (
            <div className="sm:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-3 shadow-lg">
                {NAV_LINKS.map(l => <button key={l} className="text-sm text-gray-600 py-1 text-left">{l}</button>)}
                <div className="flex gap-3 pt-2">
                    <button className="flex-1 text-sm font-medium border border-gray-500 py-2.5 rounded-xl">Login</button>
                    <button className="flex-1 text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-xl hover:bg-blue-700 transition-colors duration-200">Sign Up</button>
                </div>
            </div>
            )}
        </nav>

      {/* ── HERO ── */}
        <section className="hero-bg pt-32 pb-20 px-5 sm:px-8 bg-linear-65 from-blue-100 to-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 lg:gap-16">
          {/* Left */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-blue-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
                            Over 12,000 jobs posted this week
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
                        Find Your<br/>
                        <span className="text-blue-600">Dream Job</span> 🚀
                    </h1>
                    <p className="text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
                        Explore thousands of job opportunities and connect with top companies. Your next chapter starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <button className="bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-200">
                            Get Started
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <button className="border-2 border-blue-200 text-blue-700 font-semibold px-7 py-3.5 rounded-xl text-base hover:bg-blue-50 transition-all">
                            Browse Jobs
                        </button>
                    </div>
            {/* Trust strip */}
                    <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
                        <div className="flex -space-x-2">
                            {["#3b82f6","#8b5cf6","#10b981","#f59e0b"].map((c,i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{background:c}}>
                                {["A","B","C","D"][i]}
                            </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            Joined by <span className="font-semibold text-gray-800">50,000+</span> job seekers
                        </p>
                    </div>
                </div>

          {/* Right */}
                
            </div>
        </section>

        <section>
            <div className="flex-1 w-full float-anim mt-10">
                <HeroIllustration />
            </div>
        </section>

      {/* ── FEATURES ── */}
        <section className="py-20 px-5 sm:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Why JobMatrix</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Everything you need to land your job</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">We've built a toolkit that takes you from "just looking" to "offer accepted" faster than ever.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((f) => (
                    <div key={f.title} className={`feature-card ${f.bg} rounded-2xl p-6 border border-transparent hover:border-blue-100 transition-all duration-300 cursor-pointer hover:-translate-y-2 ${f.hcolor} hover:shadow-lg`}>
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${f.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                            {f.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>

      {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-5 sm:px-8 bg-linear-to-b from-blue-50/50 to-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Process</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">How it works</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Three simple steps between you and your next opportunity.</p>
                </div>

                <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
            {/* Connecting line (desktop) */}
                    <div className="hidden md:block bg-blue-500 absolute top-14 left-1/6 right-1/6 h-0.5 step-line opacity-40 z-10" style={{left:"16.67%",right:"16.67%"}}/>

                    {STEPS.map((s, i) => (
                        <div key={s.num} className="flex-1 flex flex-col items-center text-center relative z-10">
                            <div className="w-28 h-28 rounded-3xl bg-white shadow-xl border border-blue-100 flex flex-col items-center justify-center mb-5 group hover:bg-blue-600 transition-all duration-300">
                                <div className="text-blue-600 group-hover:text-white transition-colors mb-1">{s.icon}</div>
                                <span className="text-xs font-bold text-blue-300 group-hover:text-blue-200 transition-colors">{s.num}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{s.desc}</p>
                                {i < STEPS.length - 1 && (
                            <div className="md:hidden w-0.5 h-8 step-line mt-6 opacity-30 rounded-full"/>
                            )}
                        </div>
                        ))}
                </div>
            </div>
        </section>

 
        <section className="py-20 px-5 sm:px-8">
            <div className="max-w-4xl bg-blue-600 mx-auto cta-bg rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5"/>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5"/>
                <div className="absolute top-8 left-8 w-8 h-8 rounded-full bg-white/10"/>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6 text-sm font-medium text-white/90">
                        <span>✨</span> Join 50,000+ professionals
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
                        Start Your Career<br/>Journey Today!
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
                        Your dream role is one click away. Create a free account and start applying in minutes.
                    </p>
                    <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-base hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 inline-flex items-center gap-2">
                        Get Started — It's Free
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    </button>
                    <p className="text-blue-200 text-sm mt-4">No credit card required · Cancel anytime</p>
                </div>
            </div>
        </section>

      {/* ── FOOTER ── */}
        <footer className="border-t border-gray-100 py-8 px-5 sm:px-8 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                            <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" fill="none" stroke="white" strokeWidth="2"/>
                        </svg>
                    </div>
                    <span className="font-bold text-gray-800">Job<span className="text-blue-600">Matrix</span></span>
                </div>

                <p className="text-sm text-gray-400">© 2026 JobMatrix. All rights reserved.</p>

                <div className="flex items-center gap-5">
                    {["About", "Contact", "Privacy"].map(l => (
                    <button key={l} className="text-sm text-gray-400 hover:text-blue-600 transition-colors">{l}</button>
                        ))}
                </div>
            </div>
        </footer>
    </div>
  );
}

export default homepage;