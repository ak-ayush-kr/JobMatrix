import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage.jsx'
import Login from './pages/login.jsx';
import Registration from './pages/registration.jsx';
import UserDashboard from './pages/userdashboard.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
      </Routes>
    </>
  );
}

export default App
