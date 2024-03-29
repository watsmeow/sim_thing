import axios from "axios";

export const fetchData = async (selectedProduct) => {
     try {
          const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
          // const response = await axios.get(`http://localhost:3001/api/aggregatedData`);
          const fetchedData = response.data;

          const forecastData = {
               m_Sales_Revenues_LC: [],
               m_Factory_CoGs: [],
               m_Gross_Profit_cons_standard_COGS: [],
               m_Sum_of_Variances_and_risks: [],
               m_Variances: [],
               m_Risks: [],
               m_Warranty_Expenses: [],
               m_Inventory_write_down: [],
               m_Additions_to_other_provisions: [],
               m_Gross_Profit_cons: [],
               m_Operating_Expenses: [],
               m_Selling_And_Marketing: [],
               m_Research_And_Development: [],
               m_General_And_Administration: [],
               m_Market_Contribution: [],
          };

          // Mapping object for Data_type values to corresponding object keys
          const dataTypeToKeyMap = {
               "00_Sales_Revenues_LC": "m_Sales_Revenues_LC",
               "01_Factory_CoGs": "m_Factory_CoGs",
               "02_Gross_Profit_cons_standard_COGS": "m_Gross_Profit_cons_standard_COGS",
               "03_Sum_of_Variances_and_risks": "m_Sum_of_Variances_and_risks",
               "04_Variances": "m_Variances",
               "05_Risks": "m_Risks",
               "06_Warranty_Expenses": "m_Warranty_Expenses",
               "07_Inventory_write_down": "m_Inventory_write_down",
               "08_Additions_to_other_provisions": "m_Additions_to_other_provisions",
               "09_Gross_Profit_cons": "m_Gross_Profit_cons",
               "10_Operating_Expenses": "m_Operating_Expenses",
               "11_Selling_And_Marketing": "m_Selling_And_Marketing",
               "12_Research_And_Development": "m_Research_And_Development",
               "13_General_And_Administration": "m_General_And_Administration",
               "14_Market_Contribution": "m_Market_Contribution",
          };
          fetchedData.forEach((dataItem) => {
               // const units = parseInt(dataItem.Units);
               // const unitsForecasted = parseInt(dataItem.Units_forecasted);
               const units = dataItem.Units ? parseInt(dataItem.Units) : parseInt(1);
               const unitsForecasted = dataItem.Units_forecasted ? parseInt(dataItem.Units_forecasted) : parseInt(1);

               const date = new Date(dataItem.Date);
               const dataType = dataItem.Data_type;
               const key = dataTypeToKeyMap[dataType];

               if (key) {
                    if (date <= new Date("2024-03-31")) {
                         forecastData[key].push(units);
                    } else {
                         forecastData[key].push(unitsForecasted);
                    }
               }
          });
          console.log("forecast data", forecastData);
          return forecastData;
     } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
     }
};

// export const fetchData = async () => {
//      try {
//           const response = await axios.get(`http://localhost:3001/api/aggregatedData`);
//           console.log(response.data);
//      } catch (error) {
//           console.error("Error fetching data:", error);
//      }
// };

export const MockData = {
     m_Sales_Revenues_LC: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
     m_Factory_CoGs: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
     m_Gross_Profit_cons_standard_COGS: [
          300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
     ],
     m_Sum_of_Variances_and_risks: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
     m_Variances: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
     m_Risks: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
     m_Warranty_Expenses: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_Inventory_write_down: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_Additions_to_other_provisions: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_Gross_Profit_cons: [240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240],
     m_Operating_Expenses: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
     m_Selling_And_Marketing: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_Research_And_Development: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_General_And_Administration: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
     m_Market_Contribution: [210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210],
};

export const data = {
     m_Sales_Revenues_LC: {
          Units: [
               500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
               500, 500, 500, 500, 500, 500, 500, 500, 500,
          ],
          Units_forecasted: [
               500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
               500, 500, 500, 500, 500, 500, 500, 500, 500,
          ],
     },
     m_Factory_CoGs: {
          Units: [
               200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
               200, 200, 200, 200, 200, 200, 200, 200, 200,
          ],
          Units_forecasted: [
               200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
               200, 200, 200, 200, 200, 200, 200, 200, 200,
          ],
     },
     m_Gross_Profit_cons_standard_COGS: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
     m_Sum_of_Variances_and_risks: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
     m_Variances: {
          Units: [
               30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
               30, 30,
          ],
          Units_forecasted: [
               30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
               30, 30,
          ],
     },
     m_Risks: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
     m_Warranty_Expenses: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_Inventory_write_down: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_Additions_to_other_provisions: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_Gross_Profit_cons: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
     m_Operating_Expenses: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
     m_Selling_And_Marketing: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_Research_And_Development: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_General_And_Administration: {
          Units: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
          Units_forecasted: [
               10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
               10, 10,
          ],
     },
     m_Market_Contribution: {
          Units: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          Units_forecasted: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     },
};

// export const data = {
//      "00_Sales_Revenues_LC": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "01_Factory_CoGs": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "02_Gross_Profit_cons_standard_COGS": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "03_Sum_of_Variances_and_risks": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "05_Risks": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "06_Warranty_Expenses": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "07_Inventory_write_down": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "08_Additions_to_other_provisions": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "09_Gross_Profit_cons": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "10_Operating_Expenses": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "11_Selling_And_Marketing": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "12_Research_And_Development": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
//      "13_General_And_Administration": {
//           Units: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//           Units_forecasted: [10, 4, 4, 6, 2, 3, 2, 4, 8, 8, 4, 9, 2, 6, 10, 1, 5, 1, 8, 3, 6, 6, 7, 5, 4, 9, 5, 3, 4, 3, 5, 2, 7, 1, 9, 1],
//      },
//      "14_Market_Contribution": {
//           Units: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//           Units_forecasted: [2, 10, 5, 4, 2, 8, 9, 9, 8, 8, 1, 9, 7, 5, 7, 5, 2, 8, 5, 5, 10, 1, 6, 5, 7, 7, 10, 3, 5, 7, 1, 10, 4, 6, 6, 1],
//      },
// };

// // export const data = {
// //      "00_Sales_Revenues_LC": {
// //           January: 9,
// //           February: 4,
// //           March: 7,
// //           April: 3,
// //           May: 8,
// //           June: 5,
// //           July: 2,
// //           August: 6,
// //           September: 10,
// //           October: 1,
// //           November: 8,
// //           December: 5,
// //      },
// //      "01_Factory_CoGs": {
// //           January: 4,
// //           February: 7,
// //           March: 5,
// //           April: 9,
// //           May: 2,
// //           June: 8,
// //           July: 3,
// //           August: 1,
// //           September: 6,
// //           October: 10,
// //           November: 5,
// //           December: 3,
// //      },
// //      "02_Gross_Profit_cons_standard_COGS": {
// //           January: 6,
// //           February: 9,
// //           March: 3,
// //           April: 7,
// //           May: 4,
// //           June: 8,
// //           July: 2,
// //           August: 5,
// //           September: 1,
// //           October: 10,
// //           November: 6,
// //           December: 2,
// //      },
// //      "03_Sum_of_Variances_and_risks": {
// //           January: 2,
// //           February: 8,
// //           March: 4,
// //           April: 7,
// //           May: 6,
// //           June: 1,
// //           July: 9,
// //           August: 3,
// //           September: 5,
// //           October: 10,
// //           November: 2,
// //           December: 3,
// //      },
// //      "05_Risks": {
// //           January: 8,
// //           February: 3,
// //           March: 7,
// //           April: 4,
// //           May: 9,
// //           June: 1,
// //           July: 6,
// //           August: 2,
// //           September: 5,
// //           October: 10,
// //           November: 3,
// //           December: 5,
// //      },
// //      "06_Warranty_Expenses": {
// //           January: 4,
// //           February: 7,
// //           March: 3,
// //           April: 9,
// //           May: 2,
// //           June: 8,
// //           July: 5,
// //           August: 1,
// //           September: 6,
// //           October: 10,
// //           November: 5,
// //           December: 3,
// //      },
// //      "07_Inventory_write_down": {
// //           January: 5,
// //           February: 6,
// //           March: 8,
// //           April: 4,
// //           May: 7,
// //           June: 2,
// //           July: 9,
// //           August: 3,
// //           September: 1,
// //           October: 10,
// //           November: 5,
// //           December: 3,
// //      },
// //      "08_Additions_to_other_provisions": {
// //           January: 6,
// //           February: 9,
// //           March: 4,
// //           April: 7,
// //           May: 3,
// //           June: 8,
// //           July: 2,
// //           August: 5,
// //           September: 1,
// //           October: 10,
// //           November: 6,
// //           December: 2,
// //      },
// //      "09_Gross_Profit_cons": {
// //           January: 3,
// //           February: 8,
// //           March: 6,
// //           April: 2,
// //           May: 7,
// //           June: 4,
// //           July: 9,
// //           August: 1,
// //           September: 5,
// //           October: 10,
// //           November: 3,
// //           December: 5,
// //      },
// //      "10_Operating_Expenses": {
// //           January: 7,
// //           February: 4,
// //           March: 8,
// //           April: 3,
// //           May: 9,
// //           June: 1,
// //           July: 6,
// //           August: 2,
// //           September: 5,
// //           October: 10,
// //           November: 4,
// //           December: 3,
// //      },
// //      "11_Selling_And_Marketing": {
// //           January: 4,
// //           February: 7,
// //           March: 3,
// //           April: 9,
// //           May: 2,
// //           June: 8,
// //           July: 5,
// //           August: 1,
// //           September: 6,
// //           October: 10,
// //           November: 5,
// //           December: 3,
// //      },
// //      "12_Research_And_Development": {
// //           January: 5,
// //           February: 6,
// //           March: 8,
// //           April: 4,
// //           May: 7,
// //           June: 2,
// //           July: 9,
// //           August: 3,
// //           September: 1,
// //           October: 10,
// //           November: 5,
// //           December: 3,
// //      },
// //      "13_General_And_Administration": {
// //           January: 6,
// //           February: 9,
// //           March: 4,
// //           April: 7,
// //           May: 3,
// //           June: 8,
// //           July: 2,
// //           August: 5,
// //           September: 1,
// //           October: 10,
// //           November: 6,
// //           December: 2,
// //      },
// //      "14_Market_Contribution": {
// //           January: 3,
// //           February: 8,
// //           March: 6,
// //           April: 2,
// //           May: 7,
// //           June: 4,
// //           July: 9,
// //           August: 1,
// //           September: 5,
// //           October: 10,
// //           November: 3,
// //           December: 5,
// //      },
// // };
