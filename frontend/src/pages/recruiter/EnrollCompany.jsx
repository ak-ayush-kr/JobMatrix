import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const EnrollCompany = () => {
  const { loading } = useSelector((state) => state.company);
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 validation
    if (!companyName.trim()) {
      return alert("Company name required");
    }

    try {
      const res = await axiosInstance.post(
        "/company/registerCompany",
        { companyName }
      );

      console.log("API response:", res.data); // debug

      alert("✅ Company Registered Successfully");

      // 🔥 redirect to update page
      navigate(`/update-company/${res.data.data._id}`);

      // 🔥 clear input
      setCompanyName("");

    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "❌ Failed to register company");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Register Company
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="companyName"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Registering..." : "Register Company"}
        </button>

      </form>
    </div>
  );
};

export default EnrollCompany;