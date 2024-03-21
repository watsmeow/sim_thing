import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import { data, fetchData, MockData } from "../utils/data.js";
import {
     calculateAdjustedTotalUnits,
     calculateAbsChange,
     calculatePercentChange,
     calculateOriginalYearTotal,
     months,
} from "../utils/columnCalculations.js";
import { columnGroupingModel, updateColumns, quarters } from "../utils/columns.js";

const FourthTryGrid = () => {
     const [rowData, setRowData] = useState([]);
     const [rows, setRows] = useState([]);
     const [selectedProduct, setSelectedProduct] = useState("No_selection");
     const [quarterSelection, setQuarterSelection] = useState([]);

     useEffect(() => {
          fetchData(selectedProduct)
               .then((forecastData) => {
                    const turnintorows = [
                         {
                              id: 1,
                              account: "Sales Revenues LC",
                              oct: forecastData.m_Sales_Revenues_LC[0],
                              nov: forecastData.m_Sales_Revenues_LC[1],
                              dec: forecastData.m_Sales_Revenues_LC[2],
                              jan: forecastData.m_Sales_Revenues_LC[3],
                              feb: forecastData.m_Sales_Revenues_LC[4],
                              march: forecastData.m_Sales_Revenues_LC[5],
                              april: forecastData.m_Sales_Revenues_LC[6],
                              may: forecastData.m_Sales_Revenues_LC[7],
                              june: forecastData.m_Sales_Revenues_LC[8],
                              july: forecastData.m_Sales_Revenues_LC[9],
                              aug: forecastData.m_Sales_Revenues_LC[10],
                              sept: forecastData.m_Sales_Revenues_LC[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Sales_Revenues_LC),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 2,
                              account: "Factory CoGs",
                              oct: forecastData.m_Factory_CoGs[0],
                              nov: forecastData.m_Factory_CoGs[1],
                              dec: forecastData.m_Factory_CoGs[2],
                              jan: forecastData.m_Factory_CoGs[3],
                              feb: forecastData.m_Factory_CoGs[4],
                              march: forecastData.m_Factory_CoGs[5],
                              april: forecastData.m_Factory_CoGs[6],
                              may: forecastData.m_Factory_CoGs[7],
                              june: forecastData.m_Factory_CoGs[8],
                              july: forecastData.m_Factory_CoGs[9],
                              aug: forecastData.m_Factory_CoGs[10],
                              sept: forecastData.m_Factory_CoGs[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Factory_CoGs),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 3,
                              account: "GP cons Standard CoGs",
                              oct: forecastData.m_Gross_Profit_cons_standard_COGS[0],
                              nov: forecastData.m_Gross_Profit_cons_standard_COGS[1],
                              dec: forecastData.m_Gross_Profit_cons_standard_COGS[2],
                              jan: forecastData.m_Gross_Profit_cons_standard_COGS[3],
                              feb: forecastData.m_Gross_Profit_cons_standard_COGS[4],
                              march: forecastData.m_Gross_Profit_cons_standard_COGS[5],
                              april: forecastData.m_Gross_Profit_cons_standard_COGS[6],
                              may: forecastData.m_Gross_Profit_cons_standard_COGS[7],
                              june: forecastData.m_Gross_Profit_cons_standard_COGS[8],
                              july: forecastData.m_Gross_Profit_cons_standard_COGS[9],
                              aug: forecastData.m_Gross_Profit_cons_standard_COGS[10],
                              sept: forecastData.m_Gross_Profit_cons_standard_COGS[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Gross_Profit_cons_standard_COGS),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 4,
                              account: "Variances",
                              oct: forecastData.m_Variances[0],
                              nov: forecastData.m_Variances[1],
                              dec: forecastData.m_Variances[2],
                              jan: forecastData.m_Variances[3],
                              feb: forecastData.m_Variances[4],
                              march: forecastData.m_Variances[5],
                              april: forecastData.m_Variances[6],
                              may: forecastData.m_Variances[7],
                              june: forecastData.m_Variances[8],
                              july: forecastData.m_Variances[9],
                              aug: forecastData.m_Variances[10],
                              sept: forecastData.m_Variances[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Variances),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 5,
                              account: "Warrany Expenses",
                              oct: forecastData.m_Warranty_Expenses[0],
                              nov: forecastData.m_Warranty_Expenses[1],
                              dec: forecastData.m_Warranty_Expenses[2],
                              jan: forecastData.m_Warranty_Expenses[3],
                              feb: forecastData.m_Warranty_Expenses[4],
                              march: forecastData.m_Warranty_Expenses[5],
                              april: forecastData.m_Warranty_Expenses[6],
                              may: forecastData.m_Warranty_Expenses[7],
                              june: forecastData.m_Warranty_Expenses[8],
                              july: forecastData.m_Warranty_Expenses[9],
                              aug: forecastData.m_Warranty_Expenses[10],
                              sept: forecastData.m_Warranty_Expenses[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Warranty_Expenses),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 6,
                              account: "Inventory Write Down",
                              oct: forecastData.m_Inventory_write_down[0],
                              nov: forecastData.m_Inventory_write_down[1],
                              dec: forecastData.m_Inventory_write_down[2],
                              jan: forecastData.m_Inventory_write_down[3],
                              feb: forecastData.m_Inventory_write_down[4],
                              march: forecastData.m_Inventory_write_down[5],
                              april: forecastData.m_Inventory_write_down[6],
                              may: forecastData.m_Inventory_write_down[7],
                              june: forecastData.m_Inventory_write_down[8],
                              july: forecastData.m_Inventory_write_down[9],
                              aug: forecastData.m_Inventory_write_down[10],
                              sept: forecastData.m_Inventory_write_down[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Inventory_write_down),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 7,
                              account: "Additions to Other Provisions",
                              oct: forecastData.m_Additions_to_other_provisions[0],
                              nov: forecastData.m_Additions_to_other_provisions[1],
                              dec: forecastData.m_Additions_to_other_provisions[2],
                              jan: forecastData.m_Additions_to_other_provisions[3],
                              feb: forecastData.m_Additions_to_other_provisions[4],
                              march: forecastData.m_Additions_to_other_provisions[5],
                              april: forecastData.m_Additions_to_other_provisions[6],
                              may: forecastData.m_Additions_to_other_provisions[7],
                              june: forecastData.m_Additions_to_other_provisions[8],
                              july: forecastData.m_Additions_to_other_provisions[9],
                              aug: forecastData.m_Additions_to_other_provisions[10],
                              sept: forecastData.m_Additions_to_other_provisions[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Additions_to_other_provisions),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 8,
                              account: "Risks",
                              oct: forecastData.m_Risks[0],
                              nov: forecastData.m_Risks[1],
                              dec: forecastData.m_Risks[2],
                              jan: forecastData.m_Risks[3],
                              feb: forecastData.m_Risks[4],
                              march: forecastData.m_Risks[5],
                              april: forecastData.m_Risks[6],
                              may: forecastData.m_Risks[7],
                              june: forecastData.m_Risks[8],
                              july: forecastData.m_Risks[9],
                              aug: forecastData.m_Risks[10],
                              sept: forecastData.m_Risks[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Risks),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 9,
                              account: "Sum of Variances & Risks",
                              oct: forecastData.m_Sum_of_Variances_and_risks[0],
                              nov: forecastData.m_Sum_of_Variances_and_risks[1],
                              dec: forecastData.m_Sum_of_Variances_and_risks[2],
                              jan: forecastData.m_Sum_of_Variances_and_risks[3],
                              feb: forecastData.m_Sum_of_Variances_and_risks[4],
                              march: forecastData.m_Sum_of_Variances_and_risks[5],
                              april: forecastData.m_Sum_of_Variances_and_risks[6],
                              may: forecastData.m_Sum_of_Variances_and_risks[7],
                              june: forecastData.m_Sum_of_Variances_and_risks[8],
                              july: forecastData.m_Sum_of_Variances_and_risks[9],
                              aug: forecastData.m_Sum_of_Variances_and_risks[10],
                              sept: forecastData.m_Sum_of_Variances_and_risks[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Sum_of_Variances_and_risks),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 10,
                              account: "Gross Profit",
                              oct: forecastData.m_Gross_Profit_cons[0],
                              nov: forecastData.m_Gross_Profit_cons[1],
                              dec: forecastData.m_Gross_Profit_cons[2],
                              jan: forecastData.m_Gross_Profit_cons[3],
                              feb: forecastData.m_Gross_Profit_cons[4],
                              march: forecastData.m_Gross_Profit_cons[5],
                              april: forecastData.m_Gross_Profit_cons[6],
                              may: forecastData.m_Gross_Profit_cons[7],
                              june: forecastData.m_Gross_Profit_cons[8],
                              july: forecastData.m_Gross_Profit_cons[9],
                              aug: forecastData.m_Gross_Profit_cons[10],
                              sept: forecastData.m_Gross_Profit_cons[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Gross_Profit_cons),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 11,
                              account: "Selling & Marketing",
                              oct: forecastData.m_Selling_And_Marketing[0],
                              nov: forecastData.m_Selling_And_Marketing[1],
                              dec: forecastData.m_Selling_And_Marketing[2],
                              jan: forecastData.m_Selling_And_Marketing[3],
                              feb: forecastData.m_Selling_And_Marketing[4],
                              march: forecastData.m_Selling_And_Marketing[5],
                              april: forecastData.m_Selling_And_Marketing[6],
                              may: forecastData.m_Selling_And_Marketing[7],
                              june: forecastData.m_Selling_And_Marketing[8],
                              july: forecastData.m_Selling_And_Marketing[9],
                              aug: forecastData.m_Selling_And_Marketing[10],
                              sept: forecastData.m_Selling_And_Marketing[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Selling_And_Marketing),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 12,
                              account: "Research & Development",
                              oct: forecastData.m_Research_And_Development[0],
                              nov: forecastData.m_Research_And_Development[1],
                              dec: forecastData.m_Research_And_Development[2],
                              jan: forecastData.m_Research_And_Development[3],
                              feb: forecastData.m_Research_And_Development[4],
                              march: forecastData.m_Research_And_Development[5],
                              april: forecastData.m_Research_And_Development[6],
                              may: forecastData.m_Research_And_Development[7],
                              june: forecastData.m_Research_And_Development[8],
                              july: forecastData.m_Research_And_Development[9],
                              aug: forecastData.m_Research_And_Development[10],
                              sept: forecastData.m_Research_And_Development[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Research_And_Development),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 13,
                              account: "General & Administration",
                              oct: forecastData.m_General_And_Administration[0],
                              nov: forecastData.m_General_And_Administration[1],
                              dec: forecastData.m_General_And_Administration[2],
                              jan: forecastData.m_General_And_Administration[3],
                              feb: forecastData.m_General_And_Administration[4],
                              march: forecastData.m_General_And_Administration[5],
                              april: forecastData.m_General_And_Administration[6],
                              may: forecastData.m_General_And_Administration[7],
                              june: forecastData.m_General_And_Administration[8],
                              july: forecastData.m_General_And_Administration[9],
                              aug: forecastData.m_General_And_Administration[10],
                              sept: forecastData.m_General_And_Administration[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_General_And_Administration),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 14,
                              account: "Operating Expenses",
                              oct: forecastData.m_Operating_Expenses[0],
                              nov: forecastData.m_Operating_Expenses[1],
                              dec: forecastData.m_Operating_Expenses[2],
                              jan: forecastData.m_Operating_Expenses[3],
                              feb: forecastData.m_Operating_Expenses[4],
                              march: forecastData.m_Operating_Expenses[5],
                              april: forecastData.m_Operating_Expenses[6],
                              may: forecastData.m_Operating_Expenses[7],
                              june: forecastData.m_Operating_Expenses[8],
                              july: forecastData.m_Operating_Expenses[9],
                              aug: forecastData.m_Operating_Expenses[10],
                              sept: forecastData.m_Operating_Expenses[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Operating_Expenses),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                         {
                              id: 15,
                              account: "Market Contribution",
                              oct: forecastData.m_Market_Contribution[0],
                              nov: forecastData.m_Market_Contribution[1],
                              dec: forecastData.m_Market_Contribution[2],
                              jan: forecastData.m_Market_Contribution[3],
                              feb: forecastData.m_Market_Contribution[4],
                              march: forecastData.m_Market_Contribution[5],
                              april: forecastData.m_Market_Contribution[6],
                              may: forecastData.m_Market_Contribution[7],
                              june: forecastData.m_Market_Contribution[8],
                              july: forecastData.m_Market_Contribution[9],
                              aug: forecastData.m_Market_Contribution[10],
                              sept: forecastData.m_Market_Contribution[11],
                              originalYearTotal: calculateOriginalYearTotal(forecastData.m_Market_Contribution),
                              adjTotal: 0,
                              absChange: 0,
                              percentChange: 0,
                         },
                    ];
                    setRows(turnintorows);
                    setRowData(forecastData);
               })
               .catch((error) => {
                    console.error("Error fetching data:", error);
               });
     }, [selectedProduct]);

     const columns = [
          { field: "account", headerName: "Account", width: 200 },
          { field: "oct", headerName: "October", editable: true, width: 80, align: "center" },
          { field: "nov", headerName: "November", editable: true, width: 80, align: "center" },
          { field: "dec", headerName: "December", editable: true, width: 80, align: "center" },
          { field: "jan", headerName: "January", editable: true, width: 80, align: "center" },
          { field: "feb", headerName: "February", editable: true, width: 80, align: "center" },
          { field: "march", headerName: "March", editable: true, width: 80, align: "center" },
          { field: "april", headerName: "April", editable: true, width: 80, align: "center" },
          { field: "may", headerName: "May", editable: true, width: 80, align: "center" },
          { field: "june", headerName: "June", editable: true, width: 80, align: "center" },
          { field: "july", headerName: "July", editable: true, width: 80, align: "center" },
          { field: "aug", headerName: "August", editable: true, width: 80, align: "center" },
          { field: "sept", headerName: "September", editable: true, width: 80, align: "center" },
          {
               field: "originalYearTotal",
               headerName: "Forecasted Total Units",
               align: "center",
          },
          {
               field: "adjTotal",
               headerName: "Adjusted Total Units",
               valueGetter: calculateAdjustedTotalUnits,
               align: "center",
          },
          {
               field: "absChange",
               headerName: "Absolute Change",
               valueGetter: calculateAbsChange,
               width: 85,
               align: "center",
          },
          {
               field: "percentChange",
               headerName: "Total Percent Change",
               valueGetter: calculatePercentChange,
               width: 85,
               align: "center",
          },
     ];

     const handleRowEdit = (updatedRowValues) => {
          let newData = JSON.parse(JSON.stringify(rowData));
          let newRowValuesArray = [];
          for (const month of months) {
               newRowValuesArray.push(parseInt(updatedRowValues[month]));
          }
          if (updatedRowValues.id === 1) {
               newData.m_Sales_Revenues_LC = newRowValuesArray;
          } else if (updatedRowValues.id === 2) {
               newData.m_Factory_CoGs = newRowValuesArray;
          } else if (updatedRowValues.id === 4) {
               newData.m_Variances = newRowValuesArray;
          } else if (updatedRowValues.id === 5) {
               newData.m_Warranty_Expenses = newRowValuesArray;
          } else if (updatedRowValues.id === 6) {
               newData.m_Inventory_write_down = newRowValuesArray;
          } else if (updatedRowValues.id === 7) {
               newData.m_Additions_to_other_provisions = newRowValuesArray;
          } else if (updatedRowValues.id === 11) {
               newData.m_Selling_And_Marketing = newRowValuesArray;
          } else if (updatedRowValues.id === 12) {
               newData.m_Research_And_Development = newRowValuesArray;
          } else if (updatedRowValues.id === 13) {
               newData.m_General_And_Administration = newRowValuesArray;
          }

          rows.map((row) => {
               if (row.id === 3) {
                    //GP cons Standard Cogs
                    months.forEach((month, index) => {
                         row[month] = newData.m_Sales_Revenues_LC[index] - newData.m_Factory_CoGs[index];
                    });
               }
               if (row.id === 8) {
                    // Risks
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Warranty_Expenses[index] +
                              newData.m_Inventory_write_down[index] +
                              newData.m_Additions_to_other_provisions[index];
                    });
               }
               if (row.id === 9) {
                    // Sum of Variances and Risks
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Variances[index] +
                              newData.m_Warranty_Expenses[index] +
                              newData.m_Inventory_write_down[index] +
                              newData.m_Additions_to_other_provisions[index];
                    });
               }
               if (row.id === 10) {
                    // GP
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Sales_Revenues_LC[index] -
                              newData.m_Factory_CoGs[index] -
                              (newData.m_Variances[index] +
                                   (newData.m_Warranty_Expenses[index] +
                                        newData.m_Inventory_write_down[index] +
                                        newData.m_Additions_to_other_provisions[index]));
                    });
               }
               if (row.id === 14) {
                    // Opex
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Selling_And_Marketing[index] +
                              newData.m_Research_And_Development[index] +
                              newData.m_General_And_Administration[index];
                    });
               }
               if (row.id === 15) {
                    // Market
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Sales_Revenues_LC[index] -
                              newData.m_Factory_CoGs[index] -
                              (newData.m_Variances[index] +
                                   (newData.m_Warranty_Expenses[index] +
                                        newData.m_Inventory_write_down[index] +
                                        newData.m_Additions_to_other_provisions[index])) -
                              (newData.m_Selling_And_Marketing[index] +
                                   newData.m_Research_And_Development[index] +
                                   newData.m_General_And_Administration[index]);
                    });
               }
               return row;
          });
          setRowData(newData);
     };

     const handleChange = (event) => {
          const {
               target: { value },
          } = event;
          let updatedColumnVisibilityModel = updateColumns(value);
          setQuarterSelection(value);
          setColumnVisibilityModel(updatedColumnVisibilityModel);
     };

     const handleProductChange = (event) => {
          setSelectedProduct(event.target.value);
     };

     const [columnVisibilityModel, setColumnVisibilityModel] = useState({
          oct: false,
          nov: false,
          dec: false,
          jan: false,
          feb: false,
          march: false,
          april: false,
          may: false,
          june: false,
          july: false,
          aug: false,
          sept: false,
     });

     return (
          <div style={{ margin: "3rem auto", width: "fit-content" }}>
               <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="product-select-label">BS/SBU</InputLabel>
                    <Select labelId="product-select-label" id="product-select" value={selectedProduct} label="Product" onChange={handleProductChange}>
                         <MenuItem value="No_selection">Select a BS/SBU</MenuItem>
                         <MenuItem value="ALL_MED">ALL_MED</MenuItem>
                         <MenuItem value="BU_ODX">BU_ODX</MenuItem>
                         <MenuItem value="BU_RAD">BU_RAD</MenuItem>
                         <MenuItem value="BU_REF">BU_REF</MenuItem>
                         <MenuItem value="BU_ODX">BU_ODX</MenuItem>
                         <MenuItem value="BU_VIZ">BU_VIZ</MenuItem>
                         <MenuItem value="SBU_MCS">SBU_MCS</MenuItem>
                         <MenuItem value="SBU_OPT">SBU_OPT</MenuItem>
                    </Select>
               </FormControl>

               <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="quarter-select-label">Quarter Display Selection</InputLabel>
                    <Select
                         labelId="quarter-select-label"
                         id="quarter-select"
                         multiple
                         value={quarterSelection}
                         onChange={handleChange}
                         input={<OutlinedInput id="quarter-select-input" label="quarter-select-input-label" />}
                         renderValue={(selected) => (
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                   {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                   ))}
                              </Box>
                         )}
                    >
                         {quarters.map((name) => (
                              <MenuItem key={name} value={name}>
                                   {name}
                              </MenuItem>
                         ))}
                    </Select>
               </FormControl>
               <Box
                    sx={{
                         m: 5,
                         "& .positive": {
                              backgroundColor: "rgba(157, 255, 118, 0.49)",
                              color: "#1a3e72",
                              fontWeight: "600",
                         },
                         "& .negative": {
                              backgroundColor: "#d47483",
                              color: "#1a3e72",
                              fontWeight: "600",
                         },
                    }}
               >
                    <DataGrid
                         sx={{
                              boxShadow: 2,
                              "& .MuiDataGrid-columnHeaderTitle": {
                                   whiteSpace: "normal",
                                   lineHeight: "normal",
                                   fontWeight: "bold",
                                   textAlign: "left",
                              },
                         }}
                         rowHeight={35}
                         editMode={"row"}
                         columns={columns}
                         rows={rows}
                         processRowUpdate={(newVal, oldVal) => {
                              handleRowEdit(newVal);
                              return newVal;
                         }}
                         isCellEditable={(params) =>
                              params.row.id !== 3 &&
                              params.row.id !== 8 &&
                              params.row.id !== 9 &&
                              params.row.id !== 10 &&
                              params.row.id !== 14 &&
                              params.row.id !== 15
                         }
                         hideFooterPagination
                         experimentalFeatures={{ columnGrouping: true }}
                         columnGroupingModel={columnGroupingModel}
                         // columnVisibilityModel={columnVisibilityModel}
                         // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                         // slots={{ toolbar: GridToolbar }}
                         hideFooter={true}
                         getCellClassName={(params) => {
                              if (params.field === "absChange" || params.field === "percentChange") {
                                   if (parseInt(params.value) > 0) {
                                        return "positive";
                                   } else if (parseInt(params.value)) {
                                        return "negative";
                                   }
                              }
                         }}
                    />
               </Box>
          </div>
     );
};

export default FourthTryGrid;
