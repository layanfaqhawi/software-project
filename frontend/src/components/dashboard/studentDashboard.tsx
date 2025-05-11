import React, { useEffect, useState } from 'react';
import { getDashboard } from '../../services/api';

const StudentDashboard: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getDashboard({ redirectPath: '/user/studentDashboard' });
        console.log('Student Dashboard Data:', data); // Log the data for debugging
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
      } catch (error) {
        console.error('Failed to load student dashboard data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Student Dashboard</h1>
      <p>Hello, {firstName} {lastName} 👩‍🎓</p>
    </div>
  );
};

export default StudentDashboard;
