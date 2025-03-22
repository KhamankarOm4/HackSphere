import React from 'react';

function Dashboard() {
  const stats = [
    { title: 'Total Medicines', value: '234' },
    { title: 'Low Stock Items', value: '12' },
    { title: 'Expired Items', value: '5' },
    { title: 'Out of Stock', value: '8' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg text-gray-600">{stat.title}</h2>
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 