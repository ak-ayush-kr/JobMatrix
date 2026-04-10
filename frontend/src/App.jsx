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
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import EnrollCompany from "./pages/recruiter/EnrollCompany";
import CreateJob from "./pages/recruiter/CreateJob";
import MyCompanies from "./pages/recruiter/MyCompanies";
import MyJobsRecruiter from "./pages/recruiter/MyJobsRecruiter";
import UpdateCompany from "./pages/recruiter/UpdateCompany";
import ProtectedRoute from "./components/admin/protectedroute.jsx";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/jobdetails/:jobId" element={<ProtectedRoute><JobDetailsPage /></ProtectedRoute>} />
        <Route path="/alljobs" element={<ProtectedRoute><Alljobs /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/myjobs" element={<ProtectedRoute><Myjobs /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/recruiter/dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/recruiter/enroll-company" element={<ProtectedRoute><EnrollCompany /></ProtectedRoute>} />
        <Route path="/recruiter/create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
        <Route path="/recruiter/my-companies" element={<ProtectedRoute><MyCompanies /></ProtectedRoute>} />
        <Route path="/recruiter/my-jobs" element={<ProtectedRoute><MyJobsRecruiter /></ProtectedRoute>} />
        <Route path="/update-company/:id" element={<ProtectedRoute><UpdateCompany /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App
