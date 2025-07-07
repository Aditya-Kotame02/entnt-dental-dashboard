import React, { useState, useEffect } from 'react';
import { addPatient, updatePatient } from '../utils/storage';

const PatientForm = ({ editing, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!editing;

    if (!form.name || !form.dob || !form.contact) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(form.contact)) {
      alert("Contact number must be 10 digits.");
      return;
    }

    const newPatient = {
      ...form,
      id: isEdit ? form.id : `p_${Date.now()}`
    };

    isEdit ? updatePatient(newPatient) : addPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h3 className="text-xl font-bold text-center">
          {editing ? 'Edit Patient' : 'Add Patient'}
        </h3>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Full Name *</label>
          <input
            id="name"
            name="name"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium">Date of Birth *</label>
          <input
            id="dob"
            type="date"
            name="dob"
            className="w-full border p-2 rounded"
            value={form.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium">Contact Number *</label>
          <input
            id="contact"
            name="contact"
            className="w-full border p-2 rounded"
            value={form.contact}
            onChange={handleChange}
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label htmlFor="healthInfo" className="block text-sm font-medium">Health Info (Optional)</label>
          <input
            id="healthInfo"
            name="healthInfo"
            className="w-full border p-2 rounded"
            value={form.healthInfo}
            onChange={handleChange}
            placeholder="e.g., Diabetic, Allergic to penicillin"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            {editing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
