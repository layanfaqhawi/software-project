import React, { useEffect, useState } from 'react';
import { getDashboard } from '../../services/api';

const InstructorDashboard: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const data = await getDashboard({ redirectPath: '/user/instructorDashboard' });
        console.log('Instructor Dashboard Data:', data); // Log the data for debugging
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
      } catch (error) {
        console.error('Failed to load instructor dashboard data:', error);
      }
    };

    fetchInstructorData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Instructor Dashboard</h1>
      <p>Hello, {firstName} {lastName} 👩‍🎓</p>
    </div>
  );
};

export default InstructorDashboard;
