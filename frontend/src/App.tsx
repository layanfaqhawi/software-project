import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './components/auth/auth'
import StudentDashboard from './components/dashboard/studentDashboard';
import InstructorDashboard from './components/dashboard/instructorDashboard';
import AdminDashboard from './components/dashboard/adminDashboard';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}/>
          <Route path="/studentDashboard" element={<StudentDashboard/>}/>
          <Route path="/instructorDashboard" element={<InstructorDashboard/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        </Routes>
      </Router>
    </>
  )
};

export default App
