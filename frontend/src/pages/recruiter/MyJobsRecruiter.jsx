import { useSelector } from "react-redux";
import JobCard from "../../components/recruiter/JobCard";

const MyJobsRecruiter = () => {
  const jobs = useSelector((state) => state.recruiterJobs.jobs);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Jobs</h2>

      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </div>
  );
};

export default MyJobsRecruiter;