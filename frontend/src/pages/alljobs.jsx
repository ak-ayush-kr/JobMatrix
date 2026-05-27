import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Alljobs() {
  const job = useSelector((state) => state.job.jobs);
  const navigate = useNavigate();

  // ✅ SINGLE SELECT FILTERS
  const [filters, setFilters] = useState({
    salary: "",
    location: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  // ✅ HANDLE FILTER (toggle)
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // ✅ FILTER LOGIC
  const filteredJobs = job?.filter((j) => {
    let salaryMatch = true;
    if (filters.salary === "0-100000") salaryMatch = j.salary <= 100000;
    else if (filters.salary === "100000-500000")
      salaryMatch = j.salary > 100000 && j.salary <= 500000;
    else if (filters.salary === ">500000") salaryMatch = j.salary > 500000;

    let locationMatch = true;
    if (filters.location) locationMatch = j.location === filters.location;

    return salaryMatch && locationMatch;
  });

  // ✅ SIDEBAR UI
  const FilterSidebar = () => (
    <div className="p-4 space-y-6">

      {/* Salary */}
      <div>
        <h3 className="font-semibold mb-2">Salary</h3>
        {["0-100000", "100000-500000", ">500000"].map((range) => (
          <label key={range} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="salary"
              checked={filters.salary === range}
              onChange={() => handleFilterChange("salary", range)}
            />
            {range}
          </label>
        ))}
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold mb-2">Location</h3>
        {["Mumbai", "Hyderabad", "Bangalore", "Delhi", "Pune"].map((loc) => (
          <label key={loc} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="location"
              checked={filters.location === loc}
              onChange={() => handleFilterChange("location", loc)}
            />
            {loc}
          </label>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={() => setFilters({ salary: "", location: "" })}
        className="text-sm text-red-500"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar active="Home" />

      {/* Hero */}
      <section className="bg-linear-to-br from-blue-700 via-blue-600 to-indigo-700 text-center py-12">
        <h1 className="text-3xl font-bold text-white">
          Explore Opportunities at JobMatrix
        </h1>
        <p className="text-blue-100 mt-2">
          Find jobs that match your skills and passion
        </p>
      </section>

      {/* Layout */}
      <div className="flex gap-6 p-4 lg:p-8">

        {/* Sidebar (desktop) */}
        <div className="hidden md:block w-64 bg-white shadow rounded-xl h-fit sticky top-20">
          <FilterSidebar />
        </div>

        {/* Jobs */}
        <div className="flex-1">

          {/* Mobile Filter Button */}
          <button
            className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowFilter(true)}
          >
            Filters
          </button>

          {/* No Jobs */}
          {filteredJobs?.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <h3>No jobs found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs?.map((jobs) => (
                <div
                  key={jobs._id}
                  className="rounded-2xl shadow-md p-5 bg-white hover:shadow-lg transition"
                >
                  <h2 className="font-bold text-lg">{jobs.title}</h2>
                  <p className="text-blue-600 text-sm">
                    {jobs.company?.name}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs my-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      📍 {jobs.location}
                    </span>
                    <span className="bg-green-100 px-2 py-1 rounded">
                      ⏱ {jobs.jobType}
                    </span>
                    <span className="bg-blue-100 px-2 py-1 rounded">
                      💰 {jobs.salary}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-3">
                    {jobs.description}
                  </p>

                  <div className="flex justify-between items-center text-xs">
                    <span>{jobs.createdAt}</span>
                    <button
                      onClick={() => navigate(`/jobdetails/${jobs._id}`)}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white w-64 h-full p-4">
            <button
              className="mb-4 text-red-500"
              onClick={() => setShowFilter(false)}
            >
              Close
            </button>

            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default Alljobs;