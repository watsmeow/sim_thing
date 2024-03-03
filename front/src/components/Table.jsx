
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const staticDataTypes = [
    '00_Sales_Revenues_LC',
    '01_Factory_CoGs',
    '02_Gross_Profit_cons_standard_COGS',
    '03_Sum_of_Variances_and_risks',
    '04_Variances',
    '05_Risks',
    '06_Warranty_Expenses',
    '07_Inventory_write_down',
    '08_Additions_to_other_provisions',
    '09_Gross_Profit_cons',
    '10_Operating_Expenses',
    '11_Selling_And_Marketing',
    '12_Research_And_Development',
    '13_General_And_Administration',
    '14_Market_Contribution'
];

const Table = () => {
    const [groupedData, setGroupedData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('No_selection');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
            setGroupedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleEdit = (index, value) => {
        const updatedData = [...groupedData];
        updatedData[index].editableValue = value;
        setGroupedData(updatedData);
    };

    useEffect(() => {
        fetchData();
    }, [selectedProduct]);

    return (
        <div>
            <h1>A BIG TABLE</h1>
            <div>
                <label htmlFor="dropdown">Select: </label>
                <select id="dropdown" onChange={handleProductChange} value={selectedProduct}>
                    <option value="No_selection">All</option>
                    <option value="ALL_MED">ALL_MED</option>
                    <option value="BU_ODX">BU_ODX</option>
                    <option value="BU_RAD">BU_RAD</option>
                    <option value="BU_REF">BU_REF</option>
                    <option value="BU_VIZ">BU_VIZ</option>
                    <option value="SBU_MCS">SBU_MCS</option>
                    <option value="SBU_OPT">SBU_OPT</option>
                </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Data Type</th>
                            <th>Sum of Units</th>
                            <th>Sum of Forecasted Units</th>
                            <th>Total Units</th>
                            <th>Edit</th>
                            <th>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staticDataTypes.map((dataType, index) => (
                            <tr key={index}>
                                <td>{dataType}</td>
                                <td>{groupedData[index]?.SumOfUnits || 0}</td>
                                <td>{groupedData[index]?.SumOfForecastedUnits || 0}</td>
                                <td>{groupedData[index]?.TotalUnits || 0}</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={groupedData[index]?.TotalUnits || ""}
                                        value={groupedData[index]?.editableValue || ""}
                                        onChange={(e) => handleEdit(index, e.target.value)}
                                    />
                                </td>
                                <td>{((groupedData[index]?.editableValue || groupedData[index]?.TotalUnits || 0) - (groupedData[index]?.TotalUnits || 0)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Table = () => {
//     const [groupedData, setGroupedData] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState('No_selection');

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
//             setGroupedData(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleProductChange = (event) => {
//         setSelectedProduct(event.target.value);
//     };

//     const handleEdit = (index, value) => {
//         const updatedData = [...groupedData];
//         updatedData[index].editableValue = value;
//         setGroupedData(updatedData);
//     };

//     useEffect(() => {
//         fetchData();
//     }, [selectedProduct]);

//     return (
//         <div>
//             <h1>A BIG TABLE</h1>
//             <div>
//                 <label htmlFor="dropdown">Select: </label>
//                 <select id="dropdown" onChange={handleProductChange} value={selectedProduct}>
//                     <option value="No_selection">All</option>
//                     <option value="ALL_MED">ALL_MED</option>
//                     <option value="BU_ODX">BU_ODX</option>
//                     <option value="BU_RAD">BU_RAD</option>
//                     <option value="BU_REF">BU_REF</option>
//                     <option value="BU_VIZ">BU_VIZ</option>
//                     <option value="SBU_MCS">SBU_MCS</option>
//                     <option value="SBU_OPT">SBU_OPT</option>
//                 </select>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Data Type</th>
//                             <th>Sum of Units</th>
//                             <th>Sum of Forecasted Units</th>
//                             <th>Total Units</th>
//                             <th>Edit</th>
//                             <th>Difference</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {groupedData.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.Data_type}</td>
//                                 <td>{item.SumOfUnits}</td>
//                                 <td>{item.SumOfForecastedUnits}</td>
//                                 <td>{item.TotalUnits}</td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         placeholder={item.TotalUnits}
//                                         value={item.editableValue || ""}
//                                         onChange={(e) => handleEdit(index, e.target.value)}
//                                     />
//                                 </td>
//                                 <td>{((item.editableValue || item.TotalUnits) - item.TotalUnits).toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Table;
