import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage.jsx'
import Login from './pages/login.jsx';
import Registration from './pages/registration.jsx';
import UserDashboard from './pages/userdashboard.jsx';
import JobDetailsPage from './pages/jobdetails.jsx';
import Alljobs from './pages/alljobs.jsx';
import Myjobs from './pages/myjobs.jsx';
import Profile from './pages/profile.jsx';
import Search from './pages/search.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/jobdetails/:jobId" element={<JobDetailsPage/>} />
        <Route path="/alljobs" element={<Alljobs/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/myjobs" element={<Myjobs/>}/>
        <Route path="/jobs" element={<Search/>}/>
      </Routes>
    </>
  );
}

export default App
