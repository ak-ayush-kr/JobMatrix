import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("location", formData.location);

    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      await axiosInstance.put(`/company/updateCompany/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Company Updated Successfully");
      navigate("/recruiter/dashboard")
    } catch (error) {
      alert("❌ Update Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-6 mt-8 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Company Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="website"
          placeholder="Website"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          name="logo"
          onChange={handleChange}
          className="w-full"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Company
        </button>

      </form>
    </div>
  );
};

export default UpdateCompany;