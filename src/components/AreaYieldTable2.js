import React from 'react';
import { Table } from '@mantine/core';
import jsonData from '../json/Manufac _ India Agro Dataset.json';

const AreaYieldTable2 = () => {
  // Initialize an object to store total yield and cultivation area for each crop
  const cropData = {};

  // Iterate over the data to aggregate yield and cultivation area for each crop
  jsonData.forEach((row) => {
    const cropName = row['Crop Name'];
    const yieldValue = parseFloat(row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']);
    const areaValue = parseFloat(row['Area Under Cultivation (UOM:Ha(Hectares))']);

    if (!cropData[cropName]) {
      cropData[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    // Accumulate total yield and total area for each crop
    cropData[cropName].totalYield += yieldValue || 0; 
    cropData[cropName].totalArea += areaValue || 0;
    cropData[cropName].count++;
  });

  // Initialize an object to store average yield and average area for each crop
  const averageData = {};

  // Calculate average yield and average area for each crop
  Object.keys(cropData).forEach((cropName) => {
    const { totalYield, totalArea, count } = cropData[cropName];
    averageData[cropName] = {
      averageYield: (totalYield / count || 0).toFixed(3), 
      averageArea: (totalArea / count || 0).toFixed(3), 
    };
  });

  return (
    <Table style={{ borderCollapse: 'collapse',margin:'20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Crop Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Average Yield (Kg/Ha)</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Average Cultivation Area (Ha)</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(averageData).map((cropName, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{cropName}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{averageData[cropName].averageYield}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{averageData[cropName].averageArea}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AreaYieldTable2;
