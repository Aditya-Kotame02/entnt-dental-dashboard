import React, { useState, useEffect } from 'react';
import { getIncidents, deleteIncident } from '../../utils/incidentStorage';
import { getPatients } from '../../utils/storage';
import AppointmentForm from '../../components/AppointmentForm';

const Appointments = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      deleteIncident(id);
      refresh();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Appointment
      </button>

      <div className="bg-white p-4 shadow rounded overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Patient</th>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => {
              const patient = patients.find(p => p.id === i.patientId);
              return (
                <tr key={i.id} className="border-b">
                  <td className="p-2">{patient?.name || "Unknown"}</td>
                  <td>{i.title}</td>
                  <td>{new Date(i.appointmentDate).toLocaleString()}</td>
                  <td>{i.status || "Pending"}</td>
                  <td>{i.cost ? `₹${i.cost}` : "-"}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditing(i);
                        setShowForm(true);
                      }}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {incidents.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <AppointmentForm
          editing={editing}
          patients={patients}
          onClose={() => {
            setShowForm(false);
            refresh();
          }}
        />
      )}
    </div>
  );
};

export default Appointments;
