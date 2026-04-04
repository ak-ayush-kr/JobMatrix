const JobCard = ({ job }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p className="text-gray-500">{job.company}</p>
      <p className="text-sm">Salary: ₹{job.salary}</p>
    </div>
  );
};

export default JobCard;