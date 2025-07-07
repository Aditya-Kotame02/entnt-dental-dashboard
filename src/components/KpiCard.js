import React from 'react';

const KpiCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
    <div>
      <h4 className="text-gray-600 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
    <div className="text-3xl text-blue-400">{icon}</div>
  </div>
);

export default KpiCard;
