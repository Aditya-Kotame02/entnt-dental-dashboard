import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../utils/dataUtils';
import KpiCard from '../../components/KpiCard';
import { FaUserMd, FaCheck, FaHourglassHalf, FaRupeeSign } from 'react-icons/fa';
import LogoutButton from '../../components/LogoutButton';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    setDashboard(getDashboardData());
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <KpiCard title="Total Patients" value={dashboard.totalPatients} icon={<FaUserMd />} />
        <KpiCard title="Completed Treatments" value={dashboard.completedCount} icon={<FaCheck />} />
        <KpiCard title="Pending Treatments" value={dashboard.pendingCount} icon={<FaHourglassHalf />} />
        <KpiCard title="Total Revenue" value={`₹${dashboard.revenue}`} icon={<FaRupeeSign />} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Next 10 Appointments</h3>
        <ul className="max-h-[400px] overflow-y-auto pr-2">
          {dashboard.upcomingAppointments?.map((apt, idx) => (
            <li key={idx} className="border-b py-2 flex justify-between text-sm">
              <span>{apt.title}</span>
              <span>{new Date(apt.appointmentDate).toLocaleString()}</span>
            </li>
          ))}
          {dashboard.upcomingAppointments?.length === 0 && (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;