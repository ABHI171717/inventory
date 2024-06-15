import Papa from 'papaparse';
import sampleData from './sample-data-v2.csv';

export let data = {
  recentData: [],
  inventory: []
};
console.log("sdfghhjhjhfddgff",sampleData)

export const parseData = (callback) => {
  Papa.parse(sampleData, {
    header: true,
    download: true,
    complete: (result) => {
      data.inventory = result.data.map(item => ({
        date: item.timestamp.split(' ')[0],
        type: item.condition.toUpperCase(),
        msrp: parseFloat(item.price.replace(' USD', '')),
        make: item.brand,
        title: item.title
      }));
      data.recentData = data.inventory.slice(0, 5); // Example: first 5 entries
      if (callback) callback();
    }
  });
};
