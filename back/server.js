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
          // console.log("Fetched data:", result.recordset);
     } catch (err) {
          console.error("Error fetching data:", err);
     }
}

app.get("/api/aggregatedData", async (req, res) => {
     const { product } = req.query;
     let query = `
         SELECT *
         FROM MockData
         WHERE CONVERT(DATE, Date, 101) BETWEEN '2023-10-01' AND '2024-09-30'
     `;

     if (product && product !== "No_selection") {
          // Add a WHERE clause to filter by the product if it's provided and not equal to "No_selection"
          query += ` AND Product = '${product}'`;
     }

     try {
          const result = await sql.query(query);
          res.json(result.recordset);
          console.log("Fetched data:", result.recordset);
     } catch (err) {
          console.error("Error fetching data:", err);
     }
});

// Connect to the database and then fetch data
connectDB()
     .then(fetchData)
     .catch((err) => console.error("Error:", err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
