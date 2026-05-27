import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../../redux/recruiterJobSlice";

const CreateJob = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const job = {
      title: form.title.value,
      company: form.company.value,
      salary: form.salary.value,
    };

    dispatch(addJob(job));
    alert("Job Created!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl mb-4">Create Job</h2>

      <input name="title" placeholder="Job Title" className="border p-2 block mb-3" />

      <select name="company" className="border p-2 block mb-3">
        {companies.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>

      <input name="salary" placeholder="Salary" className="border p-2 block mb-3" />

      <button className="bg-blue-500 text-white px-4 py-2">
        Create Job
      </button>
    </form>
  );
};

export default CreateJob;