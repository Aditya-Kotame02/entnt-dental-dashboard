import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../../utils/storage';
import PatientForm from '../../components/PatientForm';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => setPatients(getPatients());

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
      refresh();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Patients</h2>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Patient
      </button>

      <div className="bg-white rounded shadow p-4 overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Health Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td>{p.dob}</td>
                <td>{p.contact}</td>
                <td>{p.healthInfo}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowForm(true);
                    }}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PatientForm
          editing={editing}
          onClose={() => {
            setShowForm(false);
            refresh();
          }}
        />
      )}
    </div>
  );
};

export default Patients;
