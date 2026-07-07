import React from 'react'
import {useEffect} from "react";
import { getSocket } from '../utils/socket';
import { useSelector} from 'react-redux';

function Notice(){
    const notices = useSelector((state) => state.noticifications.noticifications);
    console.log("notices are",notices);
    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-white text-black md:px-20">
            <div className="w-full p-6 ">
                <div className="w-full bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-white py-8">Notifications</h1>
                </div>
            </div>
            {notices?.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <div className='w-full p-6 '>
                    <div className='flex items-center justify-center mb-4'>
                        <h3 className='mb-2 items-center justify-center text-gray-500'>Your all notifications are here !!! </h3> 
                    </div>
                    <ul>
                        {notices?.map((notice, index) => (
                            <li key={index}>
                                <div className="bg-gray-100 p-4 shadow-md mb-4 border-l-6 hover:-translate-y-2 transition-transform duration-300">
                                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                                    <p className="text-gray-600">{notice.message}</p>
                                    <p className="text-gray-400 text-sm">{new Date(notice.createdAt).toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Notice;
