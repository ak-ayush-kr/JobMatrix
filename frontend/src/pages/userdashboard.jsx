import React, { useState, useEffect } from "react";
import {
  Briefcase,
  X,
  Building2
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setJobs } from "../redux/jobSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserDashboard() {

  const [selectedJob, setSelectedJob] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  const [alljob, setalljob] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // FETCH ALL JOBS + APPLICATION STATUS
  useEffect(() => {

    const getalljobs = async () => {

      try {

        // GET ALL JOBS
        const jobsRes = await fetch(
          "http://localhost:5000/api/job/getAllJobs",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const jobsData = await jobsRes.json();

        // GET APPLIED JOBS
        const appliedRes = await fetch(
          "http://localhost:5000/api/job/getAppliedJobs",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const appliedData = await appliedRes.json();

        if (jobsRes.ok) {

          const appliedJobs = appliedData.jobs || [];

          const updatedJobs = jobsData.jobs.map((job) => {

            const appliedJob = appliedJobs.find(
              (a) => a._id === job._id
            );

            return {
              ...job,

              applicationStatus:
                appliedJob?.applicationStatus || "",

              recruiterMessage:
                appliedJob?.recruiterMessage ||
                "Your application is under review.",

              interviewDetails:
                appliedJob?.interviewDetails || "",

              interviewDate:
                appliedJob?.interviewDate || "",

              interviewTime:
                appliedJob?.interviewTime || "",

              interviewMode:
                appliedJob?.interviewMode || "",
            };
          });

          setalljob(updatedJobs);

          dispatch(setJobs(updatedJobs));
        }

      } catch (error) {

        console.error("Error fetching jobs:", error);

      }
    };

    getalljobs();

  }, []);

  // SEARCH
  const handleSearch = () => {

    if (search.trim()) {

      navigate(`/jobs?search=${encodeURIComponent(search.trim())}`);

    }
  };

  // APPLY JOB
  const handleApply = async (jobId) => {

    try {

      setApplyingJobId(jobId);

      const res = await fetch(
        `http://localhost:5000/api/application/apply/${jobId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {

        const updated = alljob.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applicationStatus: "applied",
                recruiterMessage:
                  "Application submitted successfully.",
              }
            : job
        );

        setalljob(updated);

        dispatch(setJobs(updated));

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setApplyingJobId(null);

    }
  };

  return (

    <div
      className="min-h-screen bg-[#f0f4ff]"
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >

      <Navbar active="Home" />

      {/* HERO */}
      <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

          <div className="flex flex-col lg:flex-row items-center gap-8">

            <div className="flex-1 text-center lg:text-left">

              <h1
                className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Welcome Back,
                <br />

                <span className="text-blue-200">
                  {user?.name || "User"} 👋
                </span>

              </h1>

              <p className="text-blue-200 text-lg mb-6 max-w-lg">
                Find your next opportunity today.
              </p>

              {/* SEARCH */}
              <div className="flex gap-2 max-w-xl">

                <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs..."
                    className="flex-1 text-gray-800 outline-none bg-transparent"
                  />

                </div>

                <button
                  className="bg-white/20 text-white px-5 py-3 rounded-2xl font-semibold"
                  onClick={handleSearch}
                >
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* JOBS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h2
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Latest Openings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {loading ? null : alljob.length === 0 ? (

            <div className="col-span-full text-center py-20">

              <h3 className="text-lg font-semibold text-gray-700">
                No jobs found
              </h3>

            </div>

          ) : (

            alljob
              .filter(
                (job) =>
                  job.applicationStatus !== "accepted"
              )
              .map((job, i) => (

                <div
                  key={job._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
                >

                  <div className="h-1.5 bg-blue-500 w-full" />

                  <div className="p-6 flex flex-col flex-1">

                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4">

                      <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        {job.company?.name?.charAt(0)}
                      </div>

                      <div>

                        <h3 className="font-bold text-gray-900 text-lg">
                          {job.title}
                        </h3>

                        <p className="text-blue-600 text-sm font-semibold">
                          {job.company?.name}
                        </p>

                      </div>

                    </div>

                    {/* DETAILS */}
                    <div className="space-y-2 mb-4">

                      <p className="text-sm text-gray-600">
                        📍 {job.location}
                      </p>

                      <p className="text-sm text-gray-600">
                        💰 {job.salary}
                      </p>

                      <p className="text-sm text-gray-600">
                        ⏱ {job.jobType}
                      </p>

                    </div>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    {/* REQUIREMENTS */}
                    <div className="flex flex-wrap gap-2 mb-5">

                      {job.requirements?.map((tag) => (

                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>

                      ))}

                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-2 mt-auto">

                      <button
                        onClick={() =>
                          navigate(`/jobdetails/${job._id}`)
                        }
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </button>

                      {/* REJECTED */}
                      {job.applicationStatus === "rejected" ? (

                        <button
                          disabled
                          className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-100 text-red-600 cursor-not-allowed"
                        >
                          Rejected
                        </button>

                      ) : job.applicationStatus ? (

                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowStatusDialog(true);
                          }}
                          className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-500 text-white"
                        >
                          Current Status
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            handleApply(job._id)
                          }
                          disabled={applyingJobId === job._id}
                          className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {applyingJobId === job._id
                            ? "Applying..."
                            : "Apply Now"}
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              ))

          )}

        </div>

      </main>

      {/* STATUS DIALOG */}
      {showStatusDialog && selectedJob && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-6 w-[92%] max-w-md shadow-2xl relative">

            <button
              onClick={() =>
                setShowStatusDialog(false)
              }
              className="absolute top-4 right-4 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Application Status
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Briefcase className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Job Role
                  </p>

                  <p className="font-semibold">
                    {selectedJob.title}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Building2 className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Company
                  </p>

                  <p className="font-semibold">
                    {selectedJob.company?.name}
                  </p>

                </div>

              </div>

              {/* STATUS */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Current Status
                </p>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    selectedJob.applicationStatus === "applied"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedJob.applicationStatus === "shortlisted"
                      ? "bg-blue-100 text-blue-700"
                      : selectedJob.applicationStatus === "interview_scheduled"
                      ? "bg-purple-100 text-purple-700"
                      : selectedJob.applicationStatus === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                  `}
                >
                  {selectedJob.applicationStatus}
                </span>

              </div>

              {/* MESSAGE */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Recruiter Message
                </p>

                <div className="bg-gray-100 rounded-xl p-3 text-sm">
                  {selectedJob.recruiterMessage}
                </div>

              </div>

              {/* INTERVIEW */}
              {selectedJob.interviewDetails && (

                <div>

                  <p className="text-sm text-gray-500 mb-2">
                    Interview Schedule
                  </p>

                  <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
                    {selectedJob.interviewDetails}
                  </div>

                </div>

              )}

            </div>

            <button
              onClick={() =>
                setShowStatusDialog(false)
              }
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Close
            </button>

          </div>

        </div>

      )}

      <Footer />

    </div>
  );
}

export default UserDashboard;