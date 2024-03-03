const express = require('express');
const app = express();
const sql = require('mssql');
const cors = require('cors');

app.use(cors());

const config = {
    user: 'azureuser',
    password: 'Banana47!',
    server: 'mysqlserver4747.database.windows.net',
    database: 'mySampleDatabase',
    options: {
        encrypt: true, // For Azure SQL Database
        trustServerCertificate: false // Change to true for local dev / self-signed certs
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

async function fetchData() {
    try {
        const result = await sql.query`
            SELECT TOP 10 *
            FROM MockData
        `;

        // console.log('Fetched data:', result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

app.get('/api/aggregatedData', async (req, res) => {
    const { product } = req.query;
    let query = `
        WITH AggregatedData AS (
            SELECT Data_type, 
                   SUM(Units) AS SumOfUnits, 
                   SUM(Units_forecasted) AS SumOfForecastedUnits
            FROM MockData
    `;
    if (product && product !== 'No_selection') {
        query += ` WHERE Product = '${product}'`;
    }
    query += ' GROUP BY Data_type'
           + `
        )
        SELECT Data_type, 
               CAST(SumOfUnits AS decimal(10, 2)) AS SumOfUnits, 
               CAST(SumOfForecastedUnits AS decimal(10, 2)) AS SumOfForecastedUnits,
               CAST((SumOfUnits + SumOfForecastedUnits) AS decimal(10, 2)) AS TotalUnits
        FROM AggregatedData`;

    try {
        const result = await sql.query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error retrieving aggregated data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Connect to the database and then fetch data
connectDB()
    .then(fetchData)
    .catch(err => console.error('Error:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
