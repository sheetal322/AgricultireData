import React from 'react';
import { Table } from '@mantine/core';
import jsonData from '../json/Manufac _ India Agro Dataset.json';

const CropProductionTable = () => {
  const processedData = jsonData.reduce((acc, curr) => {
    const { Year } = curr;
    if (!acc[Year]) {
      acc[Year] = { maxProduction: 0, minProduction: Infinity, maxCrop: '', minCrop: '' };
    }
    const cropName = curr['Crop Name'];
    const cropProduction = parseFloat(curr['Crop Production (UOM:t(Tonnes))']);
    if (cropProduction > acc[Year].maxProduction) {
      acc[Year].maxProduction = cropProduction;
      acc[Year].maxCrop = cropName;
    }
    if (cropProduction < acc[Year].minProduction) {
      acc[Year].minProduction = cropProduction;
      acc[Year].minCrop = cropName;
    }
    return acc;
  }, {});

  return (
    <Table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Year</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Crop with Maximum Production</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(processedData).map((year, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{year}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{processedData[year].maxCrop}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{processedData[year].minCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CropProductionTable;
