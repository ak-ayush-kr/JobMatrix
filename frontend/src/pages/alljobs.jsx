import React from 'react'
import { useState, useEffect } from "react";
import {MapPin, IndianRupee, Clock, Briefcase, Building2, SlidersHorizontal, ChevronRight, Sparkles,ArrowUpRight, Star, TrendingUp, Users, Zap, Bookmark,
  CheckCircle2
} from "lucide-react";
import Navbar from '../components/navbar.jsx';

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "Bengaluru, KA",
    salary: "₹18,00,000",
    postedDaysAgo: 1,
    type: "Full-time",
    experience: "Senior",
    description: "Lead a team of 4 engineers building cutting-edge React & TypeScript web apps. Close collaboration with product and design teams.",
    tags: ["React", "TypeScript", "Node.js"],
    featured: true,
    logo: "TN",
    accent: "#6d28d9",
    accentLight: "#ede9fe",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "GrowthPath Inc.",
    location: "Mumbai, MH",
    salary: "₹22,00,000",
    postedDaysAgo: 2,
    type: "Full-time",
    experience: "Mid-level",
    description: "Own the product roadmap for our SaaS platform serving 50K+ users. Drive strategy from ideation to launch across all verticals.",
    tags: ["Strategy", "Agile", "SaaS"],
    featured: true,
    logo: "GP",
    accent: "#059669",
    accentLight: "#d1fae5",
  },
]


function Alljobs() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar active="Home"/>  
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full mb-4">
            12,400+ opportunities live right now
          </div>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight mb-2 leading-tight">
            Explore Opportunities<br />
            <span className="text-blue-200">at JobMatrix</span>
          </h1>
          <p className="text-blue-100/90 text-[15px] mb-7 font-medium">
            Find jobs that match your skills and passion
          </p>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-8">

      </div>
      <div className="p-4 lg:p-8">
      
      {/* Conditional Rendering */}
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
          <h3 className="text-lg font-semibold">No jobs exist</h3>
          <p className="text-sm">Please check back later</p>
        </div>
      ) : (
        
        // Grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            
            <div
              key={job.id}
              className="rounded-2xl shadow-md p-5 bg-white hover:shadow-md transition hover:-translate-y-1 border-t-6 border-blue-500"
            >
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  {job.logo}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-black">{job.title}</h2>
                  <p className="text-blue-600 text-sm font-medium">
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  📍 {job.location}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                  ⏱ {job.type}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  💰 {job.salary}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm mb-3">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-50 border px-2 py-1 rounded text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                <span>Posted {job.postedDaysAgo} days ago</span>
                <button>
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    View Details <ChevronRight size={14} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>  
  )
}

export default Alljobs;