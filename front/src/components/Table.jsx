import React, { useState, useEffect } from "react";
import axios from "axios";

const staticDataTypes = [
     "00_Sales_Revenues_LC",
     "01_Factory_CoGs",
     "02_Gross_Profit_cons_standard_COGS",
     "03_Sum_of_Variances_and_risks",
     "04_Variances",
     "05_Risks",
     "06_Warranty_Expenses",
     "07_Inventory_write_down",
     "08_Additions_to_other_provisions",
     "09_Gross_Profit_cons",
     "10_Operating_Expenses",
     "11_Selling_And_Marketing",
     "12_Research_And_Development",
     "13_General_And_Administration",
     "14_Market_Contribution",
];

const Table = () => {
     //  console.log("I RERENDERED");
     const [groupedData, setGroupedData] = useState([]);
     const [selectedProduct, setSelectedProduct] = useState("No_selection");

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
               console.log(response.data);
               setGroupedData(response.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     //  Calculations
     const calculateGrossProfitStandardCOGS = () => {
          const sales = parseFloat(groupedData.find((item) => item.Data_type === "00_Sales_Revenues_LC")?.editableValue || 0);
          const factoryCOGS = parseFloat(groupedData.find((item) => item.Data_type === "01_Factory_CoGs")?.editableValue || 0);
          return sales - factoryCOGS;
     };

     const calculateRisks = () => {
          const warrantyExpenses = parseFloat(groupedData.find((item) => item.Data_type === "06_Warranty_Expenses")?.editableValue || 0);
          const inventoryWriteDown = parseFloat(groupedData.find((item) => item.Data_type === "07_Inventory_write_down")?.editableValue || 0);
          const additionsToOtherProvisions = parseFloat(
               groupedData.find((item) => item.Data_type === "08_Additions_to_other_provisions")?.editableValue || 0
          );
          return warrantyExpenses + inventoryWriteDown + additionsToOtherProvisions;
     };

     const calculateSumOfVariancesAndRisks = () => {
          const variances = parseFloat(groupedData.find((item) => item.Data_type === "04_Variances")?.editableValue || 0);
          return variances + calculateRisks();
     };

     const calculateOpex = () => {
          const sellingAndMarketing = parseFloat(groupedData.find((item) => item.Data_type === "11_Selling_And_Marketing")?.editableValue || 0);
          const researchAndDevelopment = parseFloat(groupedData.find((item) => item.Data_type === "12_Research_And_Development")?.editableValue || 0);
          const generalAndAdministration = parseFloat(
               groupedData.find((item) => item.Data_type === "13_General_And_Administration")?.editableValue || 0
          );
          return sellingAndMarketing + researchAndDevelopment + generalAndAdministration;
     };

     const calculateGrossProfitsCons = () => {
          return calculateGrossProfitStandardCOGS() - calculateSumOfVariancesAndRisks();
     };

     const calculateMarketContribution = () => {
          return calculateGrossProfitsCons() - calculateOpex();
     };

     const calculateValues = {
          "02_Gross_Profit_cons_standard_COGS": calculateGrossProfitStandardCOGS,
          "03_Sum_of_Variances_and_risks": calculateSumOfVariancesAndRisks,
          "05_Risks": calculateRisks,
          "09_Gross_Profit_cons": calculateGrossProfitsCons,
          "10_Operating_Expenses": calculateOpex,
          "14_Market_Contribution": calculateMarketContribution,
     };

     const handleProductChange = (event) => {
          setSelectedProduct(event.target.value);
     };

     //  const handleEdit = (index, value) => {
     //       const updatedData = [...groupedData];
     //       updatedData[index].editableValue = parseFloat(value);

     //       // Update calculated fields
     //       Object.keys(calculateValues).forEach((dataType) => {
     //            const dataIndex = updatedData.findIndex((item) => item.Data_type === dataType);
     //            if (dataIndex !== -1) {
     //                 updatedData[dataIndex].editableValue = calculateValues[dataType](updatedData);
     //            }
     //       });

     //       setGroupedData(updatedData);
     //  };

     const renderCalculatedField = (dataType, index) => {
          if (calculateValues[dataType]) {
               return calculateValues[dataType](groupedData);
          } else {
               return (
                    <input
                         type="text"
                         placeholder={groupedData[index]?.TotalUnits || ""}
                         value={groupedData[index]?.editableValue || ""}
                         onChange={(e) => handleEdit(index, e.target.value)}
                    />
               );
          }
     };

     const handleSave = () => {
          console.log("Edited data:", groupedData);
     };

     useEffect(() => {
          fetchData();
     }, [selectedProduct]);

     //  const getMonths2023 = () => {
     //       const months = [];
     //       for (let i = 0; i < 12; i++) {
     //            months.push(new Date(2023, i).toLocaleString("en-US", { month: "long" }));
     //       }
     //       return months;
     //  };

     // Function to get months in 2023 (only January, February, and March)
     const getMonths2023 = () => ["January", "February", "March"];

     const renderMonthColumns = () => {
          return getMonths2023().map((month, index) => <th key={index}>{month}</th>);
     };

     const renderDataByMonth = (dataType) => {
          return getMonths2023().map((month, index) => {
               const data = groupedData.find((item) => item.Data_type === dataType && item.FormattedMonth === `${month}2023`);
               return (
                    <td key={index}>
                         {data ? (
                              <input
                                   type="text"
                                   placeholder={data.SumOfForecastedUnits}
                                   value={data.SumOfForecastedUnits}
                                   onChange={(e) => handleEdit(dataType, month, e.target.value)}
                              />
                         ) : (
                              0
                         )}
                    </td>
               );
          });
     };

     const calculateTotalForecastedUnits = (dataType) => {
          return getMonths2023().reduce((total, month) => {
               const data = groupedData.find((item) => item.Data_type === dataType && item.FormattedMonth === `${month}2023`);
               return total + (data ? parseFloat(data.SumOfForecastedUnits) : 0);
          }, 0);
     };

     const handleEdit = (dataType, month, value) => {
          const newData = groupedData.map((item) => {
               if (item.Data_type === dataType && item.FormattedMonth === `${month}2023`) {
                    return { ...item, SumOfForecastedUnits: value };
               }
               return item;
          });
          setGroupedData(newData);
     };

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
                    <button onClick={handleSave}>Save</button>
                    <table>
                         <thead>
                              <tr>
                                   <th rowSpan="2">Year</th>
                                   <th colSpan={getMonths2023().length}>Months</th>
                                   <th rowSpan="2">Sum of Forecasted Units</th>
                                   <th rowSpan="2">Total Units</th>
                              </tr>
                              <tr>{renderMonthColumns()}</tr>
                         </thead>
                         <tbody>
                              {staticDataTypes.map((dataType, index) => (
                                   <tr key={index}>
                                        <td>{dataType}</td>
                                        {dataType === "00_Sales_Revenues_LC"
                                             ? renderDataByMonth(dataType)
                                             : renderMonthColumns().map((_, index) => <td key={index}>0</td>)}
                                        <td>{calculateTotalForecastedUnits(dataType)}</td>
                                        <td>{groupedData[index]?.TotalUnits || 0}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default Table;
