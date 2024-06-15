import React from 'react';
import './RecentData.css';

const RecentData = ({ data }) => {
  const recentData = data.reduce(
    (acc, item) => {
      acc.totalUnits += 1;
      acc.totalMSRP += item.msrp;
      acc[item.type].units += 1;
      acc[item.type].msrp += item.msrp;
      return acc;
    },
    {
      totalUnits: 0,
      totalMSRP: 0,
      NEW: { units: 0, msrp: 0 },
      USED: { units: 0, msrp: 0 },
      CPO: { units: 0, msrp: 0 },
    }
  );

  return (
    <div className="recent-data-container">
      <div className="recent-data-card">
        <h3>{recentData.NEW.units}</h3>
        <p># New Units</p>
      </div>
      <div className="recent-data-card">
        <h3>${recentData.NEW.msrp.toFixed(2)}</h3>
        <p>New MSRP</p>
      </div>
      <div className="recent-data-card">
        <h3>${(recentData.NEW.msrp / recentData.NEW.units).toFixed(2)}</h3>
        <p>New Avg. MSRP</p>
      </div>
      <div className="recent-data-card">
        <h3>{recentData.USED.units}</h3>
        <p># Used Units</p>
      </div>
      <div className="recent-data-card">
        <h3>${recentData.USED.msrp.toFixed(2)}</h3>
        <p>Used MSRP</p>
      </div>
      <div className="recent-data-card">
        <h3>${(recentData.USED.msrp / recentData.USED.units).toFixed(2)}</h3>
        <p>Used Avg. MSRP</p>
      </div>
      <div className="recent-data-card">
        <h3>{recentData.CPO.units}</h3>
        <p># CPO Units</p>
      </div>
      <div className="recent-data-card">
        <h3>${recentData.CPO.msrp.toFixed(2)}</h3>
        <p>CPO MSRP</p>
      </div>
    </div>
  );
};

export default RecentData;
