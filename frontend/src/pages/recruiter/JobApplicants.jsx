import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";

const JobApplicants = () => {

  const { jobId } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {

      const res = await axiosInstance.get(
        `/job/getJobById/${jobId}`
      );

      setJob(res.data.job);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const updateStatus = async (applicationId, status) => {

    try {

      await axiosInstance.put(
        `/application/updateStatus/${applicationId}`,
        { status }
      );

      fetchJob();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="p-6 bg-gray-50 min-h-screen">

        {/* JOB DETAILS */}

        {job && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <div className="flex justify-between items-center">

              <div>
                <h1 className="text-2xl font-bold">
                  {job.title}
                </h1>

                <p className="text-gray-500 mt-1">
                  {job.location}
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Requirements</h3>

                <ul className="list-disc ml-5 text-gray-600">
                  {job.requirements?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Salary</h3>
                <p>₹{job.salary}</p>
              </div>

              <div>
                <h3 className="font-semibold">Job Type</h3>
                <p>{job.jobType}</p>
              </div>

              <div>
                <h3 className="font-semibold">Experience</h3>
                <p>{job.experienceLevel} years</p>
              </div>

              <div>
                <h3 className="font-semibold">Positions</h3>
                <p>{job.position}</p>
              </div>

            </div>
          </div>
        )}

        {/* APPLICANTS */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Applicants
          </h2>

          {job?.applications?.length === 0 ? (
            <p>No applicants yet</p>
          ) : (

            <div className="space-y-4">

              {job?.applications?.map((app) => (

                <div
                  key={app._id}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-lg font-semibold">
                        {app?.applicant?.name}
                      </h3>

                      <p className="text-gray-500">
                        {app?.applicant?.email}
                      </p>

                      {/* RESUME */}

                      {app?.applicant?.profile?.resume && (
                        <a
                          href={app?.applicant?.profile?.resume}
                          target="_blank"
                          className="text-blue-600 underline mt-2 inline-block"
                        >
                          View Resume
                        </a>
                      )}

                    </div>

                    <div>

                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 capitalize">
                        {app.status.replaceAll("_", " ")}
                      </span>

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-4 flex gap-3 flex-wrap">

                    {/* PENDING */}

                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              app._id,
                              "shortlisted"
                            )
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              app._id,
                              "rejected"
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* SHORTLISTED */}

                    {app.status === "shortlisted" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/recruiter/schedule-interview/${app._id}`
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Schedule Interview
                        </button>
                      </>
                    )}

                    {/* INTERVIEW */}

                    {app.status === "interview_scheduled" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              app._id,
                              "accepted"
                            )
                          }
                          className="bg-green-700 text-white px-4 py-2 rounded"
                        >
                          Hire
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              app._id,
                              "rejected"
                            )
                          }
                          className="bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* ACCEPTED */}

                    {app.status === "accepted" && (
                      <div className="text-green-700 font-semibold">
                        Hired
                      </div>
                    )}

                    {/* REJECTED */}

                    {app.status === "rejected" && (
                      <div className="text-red-700 font-semibold">
                        Rejected
                      </div>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default JobApplicants;