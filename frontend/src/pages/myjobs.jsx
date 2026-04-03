import React, { useState } from 'react'
import { useEffect } from 'react';
import Navbar from '../components/Navbar'
import { Building } from 'lucide-react';

const statusColors = {
  Accepted: "text-green-600",
  Rejected: "text-red-600",
  Pending: "text-gray-500",
};

const alljobs = [
  {
    title: "Frontend Developer",
    salary: "₹10,00,000",
    location: "Bangalore, KA",
    status: "Pending",
    company: "Tech Solutions Inc.",
    description: "Work on modern React-based web applications and build scalable UI components."
  },
  {
    title: "Data Analyst",
    salary: "₹8,50,000",
    location: "Delhi, DL",
    status: "Accepted",
    company: "Data Insights Ltd.",
    description: "Analyze business data, create dashboards, and generate insights for decision making."
  }
];

const Myjobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    try {
      const getAppliedJobs = async () => {
        const res = await fetch("http://localhost:5000/api/company/getAppliedjobs", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setJobs(data.jobs)
        }
      };
      getAppliedJobs();
    } catch (error) {
      console.log("error while fetching applied jobs", error);
    }
  }, [])

  return (
    <div className='bg-white w-full min-h-screen'>
      <Navbar active="myjobs" />
      <div className='w-full bg-linear-to-r from-blue-100 to-white flex items-center justify-center'>
        <h1 className='text-3xl font-bold text-blue-500 py-10'>My Jobs</h1>
      </div>
      <div className='w-full'>
        {alljobs.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-gray-400 text-center'>
            <h3 className='text-lg font-semibold'>No applied jobs found</h3>
            <p className='text-sm'>Apply to some jobs to see them here</p>
          </div>
        ) : (
          <div className='max-w-6xl mx-auto px-4 py-8'>
            {alljobs.map((job) => (
              <div key={job._id} className='bg-gray-100 p-6 rounded-lg shadow-md mb-4 border-l-6'>
                <div className='flex items-center justify-between space-x-4 mb-4'>
                  <div className='flex items-center justify-center'>
                    <div className='rounded-full p-3 px-5 bg-blue-500 text-white font-bold text-lg mr-3'>
                      C
                    </div>
                    <h3 className='text-xl font-bold text-gray-800'>{job.title}</h3>
                  </div>
                  <div className='mr-3'>
                    <button className='p-2 bg-blue-500 rounded-lg text-md text-white hover:bg-blue-600 transition'>
                      view Details
                    </button>
                  </div>
                </div>
                <div className='ml-3'>
                  <p className='text-gray-800 text-sm lg:text-md flex'> 🏛️Company: {job.company}</p>
                  <p className='text-gray-800 text-sm lg:text-md'>💰Salary: {job.salary}</p>
                  <p className='text-gray-800 text-sm lg:text-md'>📍Location: {job.location}</p>
                  <p className='text-gray-800 text-sm lg:text-md'>Status: <span className={`font-bold ${statusColors[job.status] || "text-gray-500"}`}>
                    {job.status}
                  </span></p>
                  <p className='text-gray-800 text-sm lg:text-md mt-2'>{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Myjobs;