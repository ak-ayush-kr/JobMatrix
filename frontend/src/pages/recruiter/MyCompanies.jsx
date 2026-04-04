import { useSelector } from "react-redux";

const MyCompanies = () => {
  const companies = useSelector((state) => state.company.companies);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Companies</h2>

      {companies.map((c, i) => (
        <div key={i} className="border p-3 mb-2 rounded">
          <h3>{c.name}</h3>
          <p>{c.location}</p>
        </div>
      ))}
    </div>
  );
};

export default MyCompanies;