import { use, useState,useEffect } from "react";
import {MapPin, DollarSign, Briefcase, Clock, Users, Building2,CalendarDays, CheckCircle2, ChevronRight, Star, Zap,TrendingUp, Award, 
ExternalLink, BookOpen, Globe} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";


const jobData = {
  title: "Head Chef",
  company: "Tomato-Potato",
  companyInitials: "TP",
  location: "Mars Colony, Red District",
  salary: "₹1,50,000",
  salaryPeriod: "/ month",
  experience: "5 Years",
  jobType: "Full-time",
  jobCategory: "Cook",
  postedDate: "2025-03-10",
  openPositions: 3,
  applications: Array(47).fill(null),
  alreadyApplied: false,
  rating: 4.5,
  companyDescription:
    "Tomato-Potato is a pioneering intergalactic food chain bringing the best of Earth's culinary traditions to the outer planets. With 200+ locations across the solar system, we are committed to exceptional food quality, innovation, and a stellar dining experience. Our culture is built on passion, creativity, and the relentless pursuit of the perfect dish.",
  description:
    "We are seeking an exceptional Head Chef to lead our culinary operations at our flagship Mars Colony location. You will oversee a dynamic team of 15 kitchen staff, drive menu innovation, and uphold the highest standards of food quality. This is a rare opportunity to shape the future of interplanetary cuisine and create dishes enjoyed across the solar system. You'll collaborate directly with our executive team to develop seasonal menus, manage kitchen operations, and mentor the next generation of stellar cooks.",
  requirements: [
    "Minimum 5 years of experience as a Head Chef or Executive Chef",
    "Expertise in multi-cuisine cooking techniques (Earth & beyond)",
    "Strong leadership and team management skills",
    "Ability to work under high pressure in a fast-paced environment",
    "Proficiency in inventory management and food cost control",
    "Culinary degree from a recognized institute preferred",
    "Experience with low-gravity cooking equipment is a plus",
    "Excellent communication and organizational skills",
  ],
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const daysAgo = (dateStr) => {
  const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
  return diff === 0 ? "Today" : diff === 1 ? "Yesterday" : `${diff} days ago`;
};

function JobDetailsPage() {
  const [applied, setApplied] = useState(jobData.alreadyApplied);
  const [saved, setSaved] = useState(false);
  const job = jobData;
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userId = user._id;
  const hasapplied = job.applications.some(
    (app)=>app.applicant === userId
  );

  const {jobId} = useParams();
  console.log("Job ID from URL:", jobId);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getjobdetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/company/getJobById/${jobId}`,{
          method:"GET",
          credentials:"include",
        });
        const data = await res.json();
        if(res.ok) {
          console.log(data.job);
          setJobs(data.job);
        }
      } catch (error) {
        console.log("error fetching job details:", error);
      }
    };
    getjobdetails();
  }, [jobId]);


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar active="Home"/>
      <div className="max-w-6xl mx-auto px-4 py-5 ">

        {/* LEFT COLUMN */}
        <div className=" flex flex-col gap-6">

          {/* Job Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                {job.companyInitials}
              </div>

              {/* Title Area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 leading-tight">{jobs.title}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 font-semibold text-base">{jobs?.company?.name || "company"}</span>
                    </div>
                  </div>
                  {/* Apply Button (desktop top-right) */}
                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <button
                      onClick={() => !applied && setApplied(true)}
                      disabled={applied}
                      className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
                        applied
                          ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95"
                      }`}
                    >
                      {applied ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 size={15} /> Applied
                        </span>
                      ) : "Apply Now"}
                    </button>
                  </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                    <Briefcase size={11} /> {jobs.jobType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full border border-violet-100">
                    <Award size={11} /> {jobs.experienceLevel} exp
                  </span>
                </div>
              </div>
            </div>

            {/* Info Row */}
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-slate-700">{jobs.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign size={15} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Salary</p>
                  <p className="text-sm font-semibold text-slate-700">{jobs.salary}<span className="text-slate-400 font-normal text-xs">{job.salaryPeriod}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Experience</p>
                  <p className="text-sm font-semibold text-slate-700">{jobs.experienceLevel}</p>
                </div>
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="sm:hidden mt-4 flex gap-3">
              <button
                onClick={() => !applied && setApplied(true)}
                disabled={applied}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  applied
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {applied ? "✓ Applied" : "Apply Now"}
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {saved ? "★" : "☆"}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: <Users size={20} className="text-blue-600" />,
                bg: "bg-blue-50",
                label: "Applicants",
                value: `${jobs?.applications?.length}`,
                sub: "people applied",
              },
              {
                icon: <TrendingUp size={20} className="text-emerald-600" />,
                bg: "bg-emerald-50",
                label: "Open Positions",
                value: jobs.position,
                sub: "vacancies",
              },
              {
                icon: <CalendarDays size={20} className="text-violet-600" />,
                bg: "bg-violet-50",
                label: "Posted",
                value: daysAgo(jobs.createdAt),
                sub: formatDate(jobs.createdAt),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">{stat.label}</p>
                <p className="text-lg font-bold text-slate-800 leading-tight">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-slate-800">Job Description</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">{jobs.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-slate-800">Requirements</h2>
            </div>
            <ul className="space-y-3">
              {jobs?.requirements?.map((req, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-blue-600 transition-colors duration-200">
                    <CheckCircle2 size={12} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 mt-5">

          {/* Apply CTA Card */}
          <div className="bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg ">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-bold text-lg mb-1">Ready to apply?</h3>
              <p className="text-blue-100 text-sm mb-4">
                {job.applications.length} others have already applied. Don't miss out!
              </p>
            </div>
            <button
              onClick={() => !applied && setApplied(true)}
              disabled={applied}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                applied
                  ? "bg-white/20 text-white cursor-default"
                  : "bg-white text-blue-700 hover:bg-blue-50 active:scale-95 shadow-md"
              }`}
            >
              {applied ? "✓ Application Submitted" : "Apply for this Role"}
            </button>
            {!applied && (
              <p className="text-center text-blue-200 text-xs mt-3">Usually responds in 2–3 days</p>
            )}
          </div>

          {/* Company Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h2 className="text-base font-bold text-slate-800">About the Company</h2>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {job.companyInitials}
              </div>
              <div>
                <p className="font-bold text-slate-800">{jobs?.company?.name || "company"}</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{jobs?.company?.description || "No company description available."}</p>
            <button className="mt-4 flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
              <Globe size={14} /> View Company Profile <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <Briefcase size={12} className="text-white" />
            </div>
            <span className="font-bold text-slate-600">JobMatrix</span>
            <span>© 2025 All rights reserved.</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default JobDetailsPage;