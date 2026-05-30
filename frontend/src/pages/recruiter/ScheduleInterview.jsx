import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";

const ScheduleInterview = () => {

  const { applicationId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    interviewDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("Sending Data => ", formData);
    try {

      await axiosInstance.put(
        `/application/scheduleInterview/${applicationId}`,
        formData
      );

      alert("Interview Scheduled");

      navigate("/recruiter/my-companies");

    } catch (error) {
  console.log("FULL ERROR => ", error);

  console.log(
    "BACKEND RESPONSE => ",
    error?.response?.data
  );

  alert(
    error?.response?.data?.message ||
    "Something went wrong"
  );
}
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="min-h-screen bg-gray-50 flex justify-center items-center">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

          <h1 className="text-2xl font-bold mb-6">
            Schedule Interview
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="font-medium">
                Interview Date & Time
              </label>

              <input
                type="datetime-local"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full border p-3 rounded mt-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Schedule Interview
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default ScheduleInterview;