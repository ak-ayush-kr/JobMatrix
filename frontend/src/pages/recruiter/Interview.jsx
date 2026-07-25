import React from 'react'
import { useEffect, useState } from 'react';
import RecruiterNavbar from '../../components/recruiter/RecruiterNavbar';
import { User, Clock, Video } from "lucide-react";
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

const Interview = () => {
    const navigate = useNavigate();
    const handleRoom = async(id) =>{
        try {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/api/users/interview/${id}`,{
                method:"GET",
                credentials:"include",
            });
            const data = await result.json();
            if(result.ok){
                const roomid = data.code;
                navigate(`/interview/${roomid}`);
            }
            else{
                toast(data.message);
            }
        }catch (error){
            console.log("error in getting code",error);
        }
    }
    const [interviewlist, setInterviewlist] = useState([]);

    useEffect(() => {
        const fetchlist = async () => {
            try {
                const result = await fetch(`${import.meta.env.VITE_API_URL}/api/users/interviewlist`, {
                    method: "GET",
                    credentials: "include",
                })
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
                    setInterviewlist(data.interviewlist);
                }
            } catch (error) {
                console.log("error while fetching list", error);
            }
        };
        fetchlist();
    }, [])

    return (
        <div className='bg-white min-h-screen flex flex-col'>
            <ToastContainer/>
            <RecruiterNavbar />
            <div className='flex-1'>
                <div className='flex items-center justify-center pt-10'>
                    <h2 className='text-lg font-bold'>Scheduled Interviews</h2>
                </div>
                <div className='sm:mx-10 p-10'>
                    {interviewlist.length === 0 ? (
                        <div className='flex items-center justify-center'>
                            <h2 className='text-lg text-gray-500'> No Interview scheduled yet !!! </h2>
                        </div>
                    ) :
                        interviewlist.map((inter) => {
                            const interviewDate = new Date(inter.scheduledAt);
                            const now = new Date();

                            const isExpired = interviewDate < now;
                            return (<div
                                key={inter._id}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col sm:flex-row items-center justify-between"
                            >

                                <div className="space-y-3">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-700">
                                            {inter.jobDetail.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-gray-700 text-xs sm:text-sm">
                                            <span className="font-semibold">Candidate:</span>{" "}
                                            {inter.userId.name}
                                        </p>

                                        <p className="text-gray-700 text-xs sm:text-sm">
                                            <span className="font-semibold">Date:</span>{" "}
                                            {new Date(inter.scheduledAt).toLocaleDateString()}
                                        </p>

                                        <p className="text-gray-700 text-xs sm:text-sm">
                                            <span className="font-semibold">Time:</span>{" "}
                                            {new Date(inter.scheduledAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex flex-col items-end gap-3">
                                    <span className="hidden sm:flex bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Scheduled
                                    </span>

                                    {isExpired ? (
                                        <button disabled
                                            className="rounded-md bg-gray-400 text-white py-2 px-4 cursor-not-allowed"
                                        >
                                            Expired
                                        </button>
                                    ) : (
                                        <button onClick={()=>handleRoom(inter._id)} className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm text-white px-6 mt-2 py-1 sm:py-2 rounded-lg font-semibold transition">
                                            Start Interview
                                        </button>
                                    )}
                                </div>
                            </div>
                            )
                        }
                        )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Interview