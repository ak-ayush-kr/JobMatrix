import { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
  Award,
  ExternalLink,
  Globe,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const daysAgo = (dateStr) => {
  if (!dateStr) return "N/A";

  const diff = Math.floor(
    (new Date() - new Date(dateStr)) /
      (1000 * 60 * 60 * 24)
  );

  return diff === 0
    ? "Today"
    : diff === 1
    ? "Yesterday"
    : `${diff} days ago`;
};

function JobDetailsPage() {

  const [jobs, setJobs] = useState({});
  const [applicationStatus, setApplicationStatus] =
    useState("");

  const [applicationData, setApplicationData] =
    useState(null);

  const [showStatusDialog, setShowStatusDialog] =
    useState(false);

  const { user } = useSelector(
    (state) => state.auth
  );

  const userId = user?._id;

  const { jobId } = useParams();

  // APPLY JOB
  const applyJobs = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/application/apply/${jobId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {

        setApplicationStatus("pending");

        alert("Applied Successfully");

        fetchApplicationStatus();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(
        "error while applying for job ",
        error
      );

    }
  };

  // FETCH APPLICATION STATUS
  const fetchApplicationStatus = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/application/status/${jobId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok && data.applied) {

        setApplicationStatus(data.status);

        setApplicationData(data.application);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // GET JOB DETAILS
  useEffect(() => {

    const getjobdetails = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/job/getJobById/${jobId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {

          setJobs(data.job);

        }

      } catch (error) {

        console.log(
          "error fetching job details:",
          error
        );

      }
    };

    getjobdetails();

    fetchApplicationStatus();

  }, [jobId]);

  // CHECK APPLICATION STATUS
  useEffect(() => {

    if (!jobs?.applications) return;

    const userApplication =
      jobs.applications.find(
        (app) =>
          app?.applicant?._id?.toString() ===
          userId?.toString()
      );

    if (userApplication) {

      setApplicationStatus(
        userApplication.status || "pending"
      );

      setApplicationData(userApplication);

    }

  }, [jobs, userId]);

  return (

    <div className="min-h-screen bg-slate-50 font-sans">

      <Navbar active="Home" />

      <div className="max-w-6xl mx-auto px-4 py-5">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* HEADER CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

            <div className="flex items-start gap-4">

              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">

                {jobs?.company?.name?.charAt(0) || "C"}

              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-start justify-between gap-3 flex-wrap">

                  <div>

                    <h1 className="text-2xl font-bold text-slate-800 leading-tight">

                      {jobs.title}

                    </h1>

                    <div className="flex items-center gap-2 mt-1">

                      <span className="text-blue-600 font-semibold text-base">

                        {jobs?.company?.name ||
                          "Company"}

                      </span>

                    </div>

                  </div>

                  {/* DESKTOP BUTTON */}
                  <div className="hidden sm:flex flex-col items-end gap-2">

                    {applicationStatus ? (

                      <button
                        onClick={() =>
                          setShowStatusDialog(true)
                        }
                        className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-yellow-500 text-white"
                      >
                        Current Status
                      </button>

                    ) : (

                      <button
                        onClick={applyJobs}
                        className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Apply Now
                      </button>

                    )}

                  </div>

                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">

                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">

                    <Briefcase size={11} />

                    {jobs.jobType}

                  </span>

                  <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full border border-violet-100">

                    <Award size={11} />

                    {jobs.experienceLevel} exp

                  </span>

                </div>

              </div>

            </div>

            {/* INFO ROW */}
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="flex items-center gap-2.5 text-slate-600">

                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">

                  <MapPin
                    size={15}
                    className="text-slate-500"
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-400 font-medium">

                    Location

                  </p>

                  <p className="text-sm font-semibold text-slate-700">

                    {jobs.location}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2.5 text-slate-600">

                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">

                  <DollarSign
                    size={15}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-400 font-medium">

                    Salary

                  </p>

                  <p className="text-sm font-semibold text-slate-700">

                    ₹{jobs.salary}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2.5 text-slate-600">

                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">

                  <Clock
                    size={15}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-400 font-medium">

                    Experience

                  </p>

                  <p className="text-sm font-semibold text-slate-700">

                    {jobs.experienceLevel} years

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STATUS DIALOG */}
      {showStatusDialog && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-6 w-[92%] max-w-md shadow-2xl relative">

            <button
              onClick={() =>
                setShowStatusDialog(false)
              }
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-5">

              Application Status

            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-sm text-gray-500">

                  Job Role

                </p>

                <p className="font-semibold text-gray-800">

                  {jobs.title}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Company

                </p>

                <p className="font-semibold text-gray-800">

                  {jobs?.company?.name}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500 mb-2">

                  Current Status

                </p>

                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    applicationStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : applicationStatus ===
                        "shortlisted"
                      ? "bg-blue-100 text-blue-700"
                      : applicationStatus ===
                        "interview_scheduled"
                      ? "bg-purple-100 text-purple-700"
                      : applicationStatus ===
                        "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                  `}
                >
                  {applicationStatus}
                </span>

              </div>

              {/* INTERVIEW DETAILS */}
              {applicationData?.status ===
                "interview_scheduled" && (

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">

                  <h3 className="font-semibold text-blue-700 mb-2">

                    Interview Details

                  </h3>

                  <div className="space-y-2 text-sm text-slate-700">

                    <p>
                      <span className="font-semibold">
                        Date:
                      </span>{" "}
                      {new Date(
                        applicationData?.interviewDate
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Time:
                      </span>{" "}
                      {applicationData?.interviewTime}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Mode:
                      </span>{" "}
                      {applicationData?.interviewMode}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Message:
                      </span>{" "}
                      {applicationData?.recruiterMessage}
                    </p>

                  </div>

                </div>

              )}

            </div>

            <button
              onClick={() =>
                setShowStatusDialog(false)
              }
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
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

export default JobDetailsPage;