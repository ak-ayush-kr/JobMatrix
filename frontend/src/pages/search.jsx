import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const search = new URLSearchParams(location.search).get("search");

  const job = useSelector((state) => state.job.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (search) {
      const filtered = job.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [search, job]);

  return (
    <div className='min-h-screen w-full bg-white'>
      <Navbar active="Home" />
      <div className='mx-5'>
        {search ? (
          <div>
            <h2 className='text-2xl font-bold text-gray-800 py-6 px-4'>Search results for "{search}"</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
              {filteredJobs.map((jobs) => (
                <div
                  key={jobs?._id}
                  className="rounded-2xl shadow-md p-5 bg-white hover:shadow-md transition hover:-translate-y-1 border-t-6 border-blue-500"
                >

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      {"C"}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-black">{jobs?.title}</h2>
                      <p className="text-blue-600 text-sm font-medium">
                        {jobs?.company?.name}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      📍 {jobs?.location}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      ⏱ {jobs?.jobType}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      💰 {jobs?.salary}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-3">
                    {jobs?.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                    <span>Posted {jobs?.createdAt}</span>
                    <button className='p-2 hover:bg-blue-500 rounded-md hover:text-white text-blue-500'
                      onClick={() => navigate(`/jobdetails/${jobs._id}`)}>
                      <span className="flex items-center gap-1 font-medium">
                        View Details <ChevronRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2 className='text-2xl font-bold text-gray-800 py-6 px-4'>No jobs exist for "{search}"</h2>
        )}
      </div>
    </div>
  )
}

export default Search;