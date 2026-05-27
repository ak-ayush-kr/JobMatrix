import React from 'react'
import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = (props) => {
  const [activeNav, setActiveNav] = useState(props.active || "Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("user is",user.name);

  const navItems = [
    { label: "Home", icon: "⊞" },
    { label: "My Jobs", icon: "📁" },
    { label: "All Jobs", icon: "🔍" },
  ];

  return (
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
  )
}

export default Navbar;