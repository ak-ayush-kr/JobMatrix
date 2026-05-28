import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footbar from "../components/footer";

const statusColors = {
  accepted: "text-green-600",
  rejected: "text-red-600",
  applied: "text-yellow-600",
  shortlisted: "text-blue-600",
  interview: "text-purple-600",
};

const Myjobs = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const getAppliedJobs = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/job/getAppliedJobs",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {

          // ONLY HIRED JOBS
          const acceptedJobs = data.jobs.filter(
            (job) =>
              job.applicationStatus === "accepted"
          );

          setJobs(acceptedJobs);

        }

      } catch (error) {

        console.log(
          "error while fetching applied jobs",
          error
        );

      }
    };

    getAppliedJobs();

  }, []);

  return (

    <div className="bg-white w-full min-h-screen">

      <Navbar active="My Jobs" />

      {/* TOP */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-white flex items-center justify-center">

        <h1 className="text-3xl font-bold text-blue-500 py-10">
          My Jobs
        </h1>

      </div>

      {/* BODY */}
      <div className="w-full">

        {jobs.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">

            <h3 className="text-lg font-semibold">
              No hired jobs found
            </h3>

            <p className="text-sm">
              Accepted jobs will appear here
            </p>

          </div>

        ) : (

          <div className="max-w-6xl mx-auto px-4 py-8">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="bg-gray-100 p-6 rounded-2xl shadow-md mb-5 border-l-[6px] border-blue-500"
              >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-5">

                  <div className="flex items-center">

                    <div className="rounded-full p-3 px-5 bg-blue-500 text-white font-bold text-lg mr-3">

                      {job?.company?.name
                        ?.charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-gray-800">

                        {job.title}

                      </h3>

                      <p className="text-sm text-gray-500">

                        {job?.company?.name}

                      </p>

                    </div>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="space-y-2">

                  <p className="text-gray-700">
                    💰 Salary: {job.salary}
                  </p>

                  <p className="text-gray-700">
                    📍 Location: {job.location}
                  </p>

                  <p className="text-gray-700">
                    ⏱ Job Type: {job.jobType}
                  </p>

                  <p className="text-gray-700">
                    Status:{" "}

                    <span
                      className={`font-bold ${
                        statusColors[
                          job.applicationStatus
                        ] || "text-gray-600"
                      }`}
                    >
                      {job.applicationStatus}
                    </span>

                  </p>

                  {job.recruiterMessage && (

                    <div className="bg-white rounded-xl p-3 mt-4">

                      <p className="text-sm text-gray-500 mb-1">
                        Recruiter Message
                      </p>

                      <p className="text-sm text-gray-700">
                        {job.recruiterMessage}
                      </p>

                    </div>

                  )}

                  {job.interviewDetails && (

                    <div className="bg-blue-50 rounded-xl p-3 mt-4">

                      <p className="text-sm text-blue-500 mb-1">
                        Interview Details
                      </p>

                      <p className="text-sm text-blue-700">
                        {job.interviewDetails}
                      </p>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footbar />

    </div>
  );
};

export default Myjobs;