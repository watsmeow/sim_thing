const express = require("express");
const app = express();
const sql = require("mssql");
const cors = require("cors");

app.use(cors());

const config = {
     user: "azureuser",
     password: "Banana47!",
     server: "mysqlserver4747.database.windows.net",
     database: "mySampleDatabase",
     options: {
          encrypt: true, // For Azure SQL Database
          trustServerCertificate: false, // Change to true for local dev / self-signed certs
     },
};

async function connectDB() {
     try {
          await sql.connect(config);
          console.log("Connected to the database");
     } catch (err) {
          console.error("Error connecting to the database:", err);
     }
}

async function fetchData() {
     try {
          const result = await sql.query`
            SELECT TOP 10 *
            FROM MockData
        `;

          console.log("Fetched data:", result.recordset);
     } catch (err) {
          console.error("Error fetching data:", err);
     }

     // try {
     //      const result = await sql.query`
     //      SELECT *
     //      FROM MockData
     //      WHERE CONVERT(DATE, Date, 101) BETWEEN '2023-10-01' AND '2024-09-30'
     //  `;
     //      console.log("Fetched raw data:", result.recordset);
     //      const fetchedData = result.recordset;

     //      const forecastData = {
     //           m_Sales_Revenues_LC: [],
     //           m_Factory_CoGs: [],
     //           m_Gross_Profit_cons_standard_COGS: [],
     //           m_Sum_of_Variances_and_risks: [],
     //           m_Variances: [],
     //           m_Risks: [],
     //           m_Warranty_Expenses: [],
     //           m_Inventory_write_down: [],
     //           m_Additions_to_other_provisions: [],
     //           m_Gross_Profit_cons: [],
     //           m_Operating_Expenses: [],
     //           m_Selling_And_Marketing: [],
     //           m_Research_And_Development: [],
     //           m_General_And_Administration: [],
     //           m_Market_Contribution: [],
     //      };

     //      // Mapping object for Data_type values to corresponding object keys
     //      const dataTypeToKeyMap = {
     //           "00_Sales_Revenues_LC": "m_Sales_Revenues_LC",
     //           "01_Factory_CoGs": "m_Factory_CoGs",
     //           "02_Gross_Profit_cons_standard_COGS": "m_Gross_Profit_cons_standard_COGS",
     //           "03_Sum_of_Variances_and_risks": "m_Sum_of_Variances_and_risks",
     //           "04_Variances": "m_Variances",
     //           "05_Risks": "m_Risks",
     //           "06_Warranty_Expenses": "m_Warranty_Expenses",
     //           "07_Inventory_write_down": "m_Inventory_write_down",
     //           "08_Additions_to_other_provisions": "m_Additions_to_other_provisions",
     //           "09_Gross_Profit_cons": "m_Gross_Profit_cons",
     //           "10_Operating_Expenses": "m_Operating_Expenses",
     //           "11_Selling_And_Marketing": "m_Selling_And_Marketing",
     //           "12_Research_And_Development": "m_Research_And_Development",
     //           "13_General_And_Administration": "m_General_And_Administration",
     //           "14_Market_Contribution": "m_Market_Contribution",
     //      };

     //      fetchedData.forEach((dataItem) => {
     //           const units = dataItem.Units ? parseInt(dataItem.Units) : 0;
     //           const unitsForecasted = dataItem.Units_forecasted ? parseInt(dataItem.Units_forecasted) : 0;

     //           const date = new Date(dataItem.Date);
     //           const dataType = dataItem.Data_type;
     //           const key = dataTypeToKeyMap[dataType];

     //           if (key) {
     //                // Check date to determine which value to push
     //                if (date <= new Date("2024-03-31")) {
     //                     forecastData[key].push(units);
     //                } else {
     //                     forecastData[key].push(unitsForecasted);
     //                }
     //           }
     //      });

     //      console.log("Fetched and transformed data:", forecastData);
     //      return forecastData;
     // } catch (err) {
     //      console.error("Error fetching and transforming data:", err);
     //      throw err; // Rethrow the error for handling at a higher level if needed
     // }
}

app.get("/api/aggregatedData", async (req, res) => {
     try {
          const result = await sql.query`
          SELECT *
          FROM MockData
          WHERE CONVERT(DATE, Date, 101) BETWEEN '2023-10-01' AND '2024-09-30'
      `;
          console.log("Fetched raw data:", result.recordset);
          const fetchedData = result.recordset;

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
               const units = dataItem.Units ? parseInt(dataItem.Units) : 0;
               const unitsForecasted = dataItem.Units_forecasted ? parseInt(dataItem.Units_forecasted) : 0;

               const date = new Date(dataItem.Date);
               const dataType = dataItem.Data_type;
               const key = dataTypeToKeyMap[dataType];

               if (key) {
                    // Check date to determine which value to push
                    if (date <= new Date("2024-03-31")) {
                         forecastData[key].push(units);
                    } else {
                         forecastData[key].push(unitsForecasted);
                    }
               }
          });

          console.log("Fetched and transformed data:", forecastData);
          res.json(forecastData);
          // return forecastData;
     } catch (err) {
          console.error("Error fetching and transforming data:", err);
          throw err; // Rethrow the error for handling at a higher level if needed
     }
});
// app.get("/api/aggregatedData", async (req, res) => {
//      const { product } = req.query;
//      console.log("MADE A BIG OL QUERY");

//      let query = `
//      WITH AggregatedData AS (
//        SELECT
//          Data_type,
//          CONCAT(FORMAT(Date, 'MMMM'), FORMAT(Date, 'yyyy')) AS FormattedMonth,
//          CAST(SUM(Units) AS decimal(10,2)) AS SumOfUnits,
//          CAST(SUM(Units_forecasted) AS decimal(10,2)) AS SumOfForecastedUnits
//        FROM
//          MockData
//    `;

//      if (product && product !== "No_selection") {
//           query += ` WHERE Product = '${product}'`;
//      }

//      query += `
//        GROUP BY
//          Data_type,
//          CONCAT(FORMAT(Date, 'MMMM'), FORMAT(Date, 'yyyy'))
//      )
//      SELECT
//        Data_type,
//        FormattedMonth,
//        ISNULL(SUM(SumOfUnits), 0) AS SumOfUnits,
//        ISNULL(SUM(SumOfForecastedUnits), 0) AS SumOfForecastedUnits,
//        ISNULL(SUM(SumOfUnits) + SUM(SumOfForecastedUnits), 0) AS TotalUnits
//      FROM
//        AggregatedData
//      GROUP BY
//        Data_type,
//        FormattedMonth
//      ORDER BY
//        Data_type,
//        FormattedMonth;
//    `;

//      try {
//           const result = await sql.query(query);
//           res.json(result.recordset);
//      } catch (error) {
//           console.error("Error retrieving aggregated data:", error);
//           res.status(500).json({ error: "Internal server error" });
//      }
// });

// Connect to the database and then fetch data
connectDB()
     .then(fetchData)
     .catch((err) => console.error("Error:", err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
