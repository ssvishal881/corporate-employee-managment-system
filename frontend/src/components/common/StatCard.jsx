import React from "react";

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <p className="text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
};

export default StatCard;
