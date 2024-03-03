const fs = require('fs');
const csv = require('csv-parser');

let mockData = [];

// Read mock data from CSV file into memory
fs.createReadStream('./mock_data.csv')
  .pipe(csv())
  .on('headers', (headers) => {
    // Extract column names from the header row
    console.log('Header row:', headers);
  })
  .on('data', (row) => {
    // Process each data row
    const rowData = {};
    Object.keys(row).forEach((key) => {
      // Use column names from the header row as property names
      rowData[key] = row[key];
    });
    mockData.push(rowData);
  })
  .on('end', () => {
    console.log('Mock data loaded');
  });

const query = async (queryString) => {
  // return the entire mock data for now
  return mockData;
};

module.exports = {
  query,
};