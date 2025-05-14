import React, { useEffect, useState } from 'react';
import { getDashboard } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getDashboard({ redirectPath: '/user/adminDashboard' });
        console.log('Admin Dashboard Data:', data); // Log the data for debugging
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
      } catch (error) {
        console.error('Failed to load admin dashboard data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Hello, {firstName} {lastName} 👩‍🎓</p>
    </div>
  );
};

export default AdminDashboard;
