import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Filter.css'

const AverageMSRP = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = { date, msrpTotal: 0, count: 0 };
    }
    acc[date].msrpTotal += item.msrp;
    acc[date].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(groupedData).map(item => ({
    date: item.date,
    msrp: (item.msrpTotal / item.count).toFixed(2)
  }));

  console.log("LKJHGFGHJKL:",chartData)

  return (
    <div className="data-section">
      <h2>Average MSRP by Date</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 600]} ticks={[0, 100, 200, 300, 400, 500, 600]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="msrp" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageMSRP;
