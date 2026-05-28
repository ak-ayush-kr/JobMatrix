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
import RecruiterRoute from './components/admin/recruiterroute.jsx';
import JobApplicants from "./pages/recruiter/JobApplicants";
import ScheduleInterview from "./pages/recruiter/ScheduleInterview";
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
        <Route path="/recruiter/dashboard" element={<RecruiterRoute><RecruiterDashboard /></RecruiterRoute>} />
        <Route path="/recruiter/enroll-company" element={<RecruiterRoute><EnrollCompany /></RecruiterRoute>} />
        <Route path="/recruiter/create-job" element={<RecruiterRoute><CreateJob /></RecruiterRoute>} />
        <Route path="/recruiter/my-companies" element={<RecruiterRoute><MyCompanies /></RecruiterRoute>} />
        <Route path="/recruiter/my-jobs" element={<RecruiterRoute><MyJobsRecruiter /></RecruiterRoute>} />
        <Route path="/update-company/:id" element={<RecruiterRoute><UpdateCompany /></RecruiterRoute>} />
        <Route
          path="/recruiter/job/:jobId"
          element={<JobApplicants />}
        />

        <Route
          path="/recruiter/schedule-interview/:applicationId"
          element={<ScheduleInterview />}
        />
      </Routes>
    </>
  );
}

export default App
