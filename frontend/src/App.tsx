import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './components/auth/auth'
import './App.css'
import StudentDashboard from './components/dashboard/studentDashboard';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}/>
          <Route path="/studentDashboard" element={<StudentDashboard/>}/>
        </Routes>
      </Router>
    </>
  )
};

export default App
