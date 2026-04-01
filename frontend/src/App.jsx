import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage.jsx'
import Login from './pages/login.jsx';
import Registration from './pages/registration.jsx';
import UserDashboard from './pages/userdashboard.jsx';
import JobDetailsPage from './pages/jobdetails.jsx';
import Alljobs from './pages/alljobs.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/jobdetails/:id" element={<JobDetailsPage/>} />
        <Route path="/alljobs" element={<Alljobs/>} />
      </Routes>
    </>
  );
}

export default App
