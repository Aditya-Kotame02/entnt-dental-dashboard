import React, { useState, useEffect } from 'react';
import { addIncident, updateIncident } from '../utils/incidentStorage';

const AppointmentForm = ({ editing, patients, onClose }) => {
  const [form, setForm] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: '',
    nextDate: '',
    files: []
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        files: [...(prev.files || []), {
          name: file.name,
          url: reader.result
        }]
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.patientId || !form.appointmentDate) {
      alert("Please fill all required fields");
      return;
    }

    const newIncident = {
      ...form,
      id: editing ? form.id : `i_${Date.now()}`
    };

    editing ? updateIncident(newIncident) : addIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-center">{editing ? "Edit" : "Add"} Appointment</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="patientId" value={form.patientId} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Title" />
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Description" />
          <textarea name="comments" value={form.comments} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Comments" />
          <input type="datetime-local" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} className="w-full border p-2 rounded" />

          <input name="cost" value={form.cost} onChange={handleChange} type="number" className="w-full border p-2 rounded" placeholder="Cost" />
          <input name="treatment" value={form.treatment} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Treatment" />
          <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="datetime-local" name="nextDate" value={form.nextDate} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="file" onChange={handleFileUpload} className="w-full border p-2 rounded" />

          {form.files && form.files.length > 0 && (
            <div className="text-xs text-gray-700">
              <strong>Uploaded Files:</strong>
              <ul className="list-disc pl-4">
                {form.files.map((f, idx) => <li key={idx}>{f.name}</li>)}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-300 text-sm rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
