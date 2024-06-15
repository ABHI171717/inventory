import React from 'react';
import './Filter.css'

const HistoryLog = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = { type, count: 0, msrpTotal: 0 };
    }
    acc[type].count += 1;
    acc[type].msrpTotal += item.msrp;
    return acc;
  }, {});

  const chartData = Object.values(groupedData).map(item => ({
    type: item.type,
    count: item.count,
    totalMSRP: item.msrpTotal,
    avgMSRP: (item.msrpTotal / item.count).toFixed(2)
  }));

  return (
    <div className="data-section">
      <h2>History Log</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Total MSRP</th>
            <th>Avg MSRP</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{item.count}</td>
              <td>${item.totalMSRP.toFixed(2)}</td>
              <td>${item.avgMSRP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;
