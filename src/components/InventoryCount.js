import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Inventory.css';

const InventoryCount = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ NEW: true, USED: true, CPO: true });

  useEffect(() => {
    const groupedData = data.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = { date, NEW: 0, USED: 0, CPO: 0 };
      }
      acc[date][item.type] += 1;
      return acc;
    }, {});

    const formattedChartData = Object.values(groupedData);
    setChartData(formattedChartData);
  }, [data]);

  const handleLegendClick = (dataKey) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [dataKey]: !prevFilters[dataKey],
    }));
  };

  const resetFilters = () => {
    setActiveFilters({ NEW: true, USED: true, CPO: true });
  };

  return (
    <div className="data-section">
      <h2>Inventory Count by Date</h2>
      <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend onClick={(e) => handleLegendClick(e.dataKey)} />
          {activeFilters.NEW && <Bar dataKey="NEW" fill="#8884d8" />}
          {activeFilters.USED && <Bar dataKey="USED" fill="#82ca9d" />}
          {activeFilters.CPO && <Bar dataKey="CPO" fill="#ffc658" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryCount;
