import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { setCompanies } from "../../redux/companySlice";
import { setJobs } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";

const MyCompanies = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companies = useSelector(
    (state) => state.company.companies
  );

  const jobs = useSelector(
    (state) => state.job.jobs
  );

  // FETCH DATA
  useEffect(() => {

    const fetchData = async () => {

      try {

        // companies
        const companyRes = await axiosInstance.get(
          "/company/getCompany"
        );

        dispatch(
          setCompanies(companyRes.data.companies)
        );

        // jobs
        const jobRes = await axiosInstance.get(
          "/job/getAdminJobs"
        );

        dispatch(setJobs(jobRes.data.jobs));

      } catch (error) {

        console.log(error);

      }
    };

    fetchData();

  }, [dispatch]);

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        My Companies
      </h2>

      {companies.length === 0 ? (

        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <p className="text-gray-500">
            No companies found
          </p>
        </div>

      ) : (

        companies.map((company) => {

          // filter jobs for current company
          const companyJobs = jobs.filter(
            (job) =>
              job.company?._id === company._id
          );

          return (

            <div
              key={company._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6"
            >

              {/* COMPANY INFO */}
              <div className="mb-5">

                <h3 className="text-2xl font-bold text-gray-800">
                  {company.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  {company.location || "No location"}
                </p>

                {
                  company.description && (
                    <p className="text-sm text-gray-600 mt-3">
                      {company.description}
                    </p>
                  )
                }

              </div>

              {/* JOB SECTION */}
              <div className="mt-4">

                <h4 className="font-semibold text-lg mb-4 text-gray-700">
                  Jobs
                </h4>

                {companyJobs.length === 0 ? (

                  <div className="bg-gray-50 border rounded-xl p-4">
                    <p className="text-gray-500">
                      No jobs posted
                    </p>
                  </div>

                ) : (

                  <div className="space-y-4">

                    {companyJobs.map((job) => (

                      <div
                        key={job._id}
                        className="bg-gray-50 border border-gray-200 p-4 rounded-2xl hover:shadow transition-all"
                      >

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                          {/* LEFT */}
                          <div>

                            <h3 className="text-lg font-semibold text-gray-800">
                              {job.title}
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">
                              Salary: ₹{job.salary}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">

                              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                                {job.jobType}
                              </span>

                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                {job.position} Positions
                              </span>

                              <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                                {job.experienceLevel} yrs exp
                              </span>

                            </div>

                          </div>

                          {/* RIGHT */}
                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                navigate(
                                  `/recruiter/job/${job._id}`
                                )
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-all"
                            >
                              View Details
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          );
        })

      )}

    </div>

  );
};

export default MyCompanies;