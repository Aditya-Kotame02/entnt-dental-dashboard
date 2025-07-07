import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getIncidents } from '../../utils/incidentStorage';
import { getPatients } from '../../utils/storage';
import FilePreview from '../../components/FilePreview';
import LogoutButton from '../../components/LogoutButton';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const allIncidents = getIncidents();
    const myRecords = allIncidents.filter(i => i.patientId === user.patientId);

    const now = new Date();
    setUpcoming(myRecords.filter(i => new Date(i.appointmentDate) > now));
    setHistory(myRecords.filter(i => new Date(i.appointmentDate) <= now));

    const patient = getPatients().find(p => p.id === user.patientId);
    setPatientInfo(patient);
  }, [user.patientId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome, {patientInfo?.name || 'Patient'}</h2>
        <LogoutButton />
      </div>

      {/* UPCOMING */}
      <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
      <div className="bg-white shadow rounded p-4 mb-6">
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          upcoming.map((item, idx) => (
            <div key={idx} className="border-b py-3">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm">Date: {new Date(item.appointmentDate).toLocaleString()}</p>
              <p className="text-sm">Status: {item.status || 'Scheduled'}</p>
              <p className="text-sm">Comments: {item.comments || '-'}</p>
            </div>
          ))
        )}
      </div>

      {/* HISTORY */}
      <h3 className="text-lg font-semibold mb-2">Appointment History</h3>
      <div className="bg-white shadow rounded p-4 mb-6">
        {history.length === 0 ? (
          <p className="text-gray-500">No past appointments found.</p>
        ) : (
          history.map((item, idx) => (
            <div key={idx} className="border-b py-3">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm">Date: {new Date(item.appointmentDate).toLocaleString()}</p>
              <p className="text-sm">Status: {item.status || 'Completed'}</p>
              <p className="text-sm">Treatment: {item.treatment || '-'}</p>
              <p className="text-sm">Cost: ₹{item.cost || '-'}</p>
              <p className="text-sm">Comments: {item.comments || '-'}</p>
              <FilePreview files={item.files} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
