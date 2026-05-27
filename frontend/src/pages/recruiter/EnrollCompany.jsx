import { useDispatch } from "react-redux";
import { addCompany } from "../../redux/companySlice";

const EnrollCompany = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const company = {
      name: form.name.value,
      location: form.location.value,
    };

    dispatch(addCompany(company));
    alert("Company Added!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl mb-4">Enroll Company</h2>

      <input name="name" placeholder="Company Name" className="border p-2 block mb-3" />
      <input name="location" placeholder="Location" className="border p-2 block mb-3" />

      <button className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default EnrollCompany;