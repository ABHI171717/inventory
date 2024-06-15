import React, { useState, useEffect } from 'react';
import RecentData from './RecentData';
import InventoryCount from './InventoryCount';
import AverageMSRP from './AverageMSRP';
import HistoryLog from './HistoryLog';
import Filter from './Filter';
import Sidebar from './Sidebar';
import { data, parseData } from '../data';
import './dashboard.css';

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState({ recentData: [], inventory: [] });
  const [vehicleType, setVehicleType] = useState('ALL');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    parseData(() => {
      setFilteredData(data);
    });
  }, []);

  const handleFilter = (filters) => {
    let filteredInventory = [...data.inventory];

    if (filters.make.length) {
      filteredInventory = filteredInventory.filter(item => filters.make.includes(item.make));
    }

    if (filters.duration.length) {
      const now = new Date();
      let dateFilteredInventory = [];
      filters.duration.forEach(duration => {
        let startDate;
        switch (duration) {
          case 'Last Month':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            break;
          case 'This Month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case 'Last 3 Months':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            break;
          case 'Last 6 Months':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            break;
          case 'This Year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          case 'Last Year':
            startDate = new Date(now.getFullYear() - 1, 0, 1);
            break;
          default:
            startDate = new Date(0);
        }
        dateFilteredInventory = dateFilteredInventory.concat(filteredInventory.filter(item => new Date(item.date) >= startDate));
      });
      filteredInventory = dateFilteredInventory;
    }

    setFilteredData({ ...data, inventory: filteredInventory });
  };

  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
    let filteredInventory = data.inventory;
    if (type !== 'ALL') {
      filteredInventory = filteredInventory.filter(item => item.type === type);
    }
    setFilteredData({ ...data, inventory: filteredInventory });
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Inventory Dashboard (Admin Dashboard)</h1>
      </div>
      <div className="filters">
        <button className="filter-button" onClick={() => setIsSidebarOpen(true)}>FILTER DATA BY</button>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Filter onFilter={handleFilter} data={data.inventory} />
      </Sidebar>
      <div className="button-container">
        <button className={vehicleType === 'ALL' ? 'active' : ''} onClick={() => handleVehicleTypeChange('ALL')}>All</button>
        <button className={vehicleType === 'NEW' ? 'active' : ''} onClick={() => handleVehicleTypeChange('NEW')}>New</button>
        <button className={vehicleType === 'USED' ? 'active' : ''} onClick={() => handleVehicleTypeChange('USED')}>Used</button>
        <button className={vehicleType === 'CPO' ? 'active' : ''} onClick={() => handleVehicleTypeChange('CPO')}>CPO</button>
      </div>
      <div className="dashboard-sections">
        <div className="section recent-data-section">
          <RecentData data={filteredData.inventory} />
        </div>
        <div className="section inventory-count-section">
          <InventoryCount data={filteredData.inventory} />
        </div>
        <div className="section average-msrp-section">
          <AverageMSRP data={filteredData.inventory} />
        </div>
        <div className="section history-log-section">
          <HistoryLog data={filteredData.inventory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
