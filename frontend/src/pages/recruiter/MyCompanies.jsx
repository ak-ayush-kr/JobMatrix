import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { setCompanies } from "../../redux/companySlice";
import { setJobs } from "../../redux/jobslice";

const MyCompanies = () => {
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.company.companies);
  const jobs = useSelector((state) => state.job.jobs);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        // companies
        const companyRes = await axiosInstance.get("/company/getCompany");
        dispatch(setCompanies(companyRes.data.companies));

        // jobs
        const jobRes = await axiosInstance.get("/job/getAdminJobs");
        dispatch(setJobs(jobRes.data.jobs));

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Companies</h2>

      {companies.length === 0 ? (
        <p>No companies found</p>
      ) : (
        companies.map((company) => {
          
          // 🔥 filter jobs for this company
          const companyJobs = jobs.filter(
            (job) => job.company?._id === company._id
          );

          return (
            <div
              key={company._id}
              className="border p-4 mb-4 rounded-lg shadow"
            >
              {/* COMPANY INFO */}
              <h3 className="text-lg font-bold">{company.name}</h3>
              <p className="text-gray-600">{company.location || "No location"}</p>

              {/* JOBS */}
              <div className="mt-3">
                <h4 className="font-semibold mb-2">Jobs:</h4>

                {companyJobs.length === 0 ? (
                  <p className="text-gray-500">No jobs posted</p>
                ) : (
                  companyJobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-gray-100 p-2 rounded mb-2"
                    >
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-gray-600">
                        Salary: ₹{job.salary}
                      </p>
                    </div>
                  ))
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