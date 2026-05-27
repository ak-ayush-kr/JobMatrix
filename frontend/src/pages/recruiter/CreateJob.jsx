import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../redux/recruiterJobSlice";
import { useState } from "react";

const CreateJob = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const { loading } = useSelector((state) => state.job);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createJob(formData)).unwrap();
      alert("✅ Job Created Successfully");

      // reset form
      setFormData({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: "",
      });

    } catch (err) {
      alert(err?.message || "❌ Failed to create job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="position"
          placeholder="Number of Positions"
          value={formData.position}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* 🔥 COMPANY DROPDOWN */}
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>

      </form>
    </div>
  );
};

export default CreateJob;