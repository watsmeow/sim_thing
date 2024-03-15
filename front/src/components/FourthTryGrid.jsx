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
import { data, forecastData } from "../utils/data.js";
import {
     calculateAdjustedTotalUnits,
     calculateAbsChange,
     calculatePercentChange,
     calculateOriginalYearTotal,
     months,
} from "../utils/columnCalculations.js";
import { calculateGPConCoGs, calculateRisks, calculateSumOfVariancesAndRisks, calculateGP } from "../utils/rowCalculations.js";
import { columnGroupingModel, updateColumns } from "../utils/columns.js";
import { darken, lighten, styled } from "@mui/material/styles";

const FourthTryGrid = () => {
     const [rowData, setRowData] = useState(forecastData);
     const [selectedProduct, setSelectedProduct] = useState("No_selection");

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
               console.log(response.data);
               // setGroupedData(response.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const columns = [
          { field: "account", headerName: "Account", width: 175 },
          { field: "oct", headerName: "October", editable: true, width: 75 },
          { field: "nov", headerName: "November", editable: true, width: 75 },
          { field: "dec", headerName: "December", editable: true, width: 75 },
          { field: "jan", headerName: "January", editable: true, width: 75 },
          { field: "feb", headerName: "February", editable: true, width: 75 },
          { field: "march", headerName: "March", editable: true, width: 75 },
          { field: "april", headerName: "April", editable: true, width: 75 },
          { field: "may", headerName: "May", editable: true, width: 75 },
          { field: "june", headerName: "June", editable: true, width: 75 },
          { field: "july", headerName: "July", editable: true, width: 75 },
          { field: "aug", headerName: "August", editable: true, width: 75 },
          { field: "sept", headerName: "September", editable: true, width: 75 },
          {
               field: "originalYearTotal",
               headerName: "Forecasted Total Units",
          },
          {
               field: "adjTotal",
               headerName: "Adjusted Total Units",
               valueGetter: calculateAdjustedTotalUnits,
          },
          {
               field: "absChange",
               headerName: "Absolute Change",
               valueGetter: calculateAbsChange,
          },
          {
               field: "percentChange",
               headerName: "Percent Change",
               valueGetter: calculatePercentChange,
          },
     ];

     const [rows, setRows] = useState([
          {
               id: 1,
               account: "Sales Revenues LC",
               jan: forecastData.m_Sales_Revenues_LC[0],
               feb: forecastData.m_Sales_Revenues_LC[1],
               march: forecastData.m_Sales_Revenues_LC[2],
               april: forecastData.m_Sales_Revenues_LC[3],
               may: forecastData.m_Sales_Revenues_LC[4],
               june: forecastData.m_Sales_Revenues_LC[5],
               july: forecastData.m_Sales_Revenues_LC[6],
               aug: forecastData.m_Sales_Revenues_LC[7],
               sept: forecastData.m_Sales_Revenues_LC[8],
               oct: forecastData.m_Sales_Revenues_LC[9],
               nov: forecastData.m_Sales_Revenues_LC[10],
               dec: forecastData.m_Sales_Revenues_LC[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Sales_Revenues_LC),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 2,
               account: "Factory CoGs",
               jan: forecastData.m_Factory_CoGs[0],
               feb: forecastData.m_Factory_CoGs[1],
               march: forecastData.m_Factory_CoGs[2],
               april: forecastData.m_Factory_CoGs[3],
               may: forecastData.m_Factory_CoGs[4],
               june: forecastData.m_Factory_CoGs[5],
               july: forecastData.m_Factory_CoGs[6],
               aug: forecastData.m_Factory_CoGs[7],
               sept: forecastData.m_Factory_CoGs[8],
               oct: forecastData.m_Factory_CoGs[9],
               nov: forecastData.m_Factory_CoGs[10],
               dec: forecastData.m_Factory_CoGs[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Factory_CoGs),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 3,
               account: "GP cons Standard CoGs",
               jan: forecastData.m_Gross_Profit_cons_standard_COGS[0],
               feb: forecastData.m_Gross_Profit_cons_standard_COGS[1],
               march: forecastData.m_Gross_Profit_cons_standard_COGS[2],
               april: forecastData.m_Gross_Profit_cons_standard_COGS[3],
               may: forecastData.m_Gross_Profit_cons_standard_COGS[4],
               june: forecastData.m_Gross_Profit_cons_standard_COGS[5],
               july: forecastData.m_Gross_Profit_cons_standard_COGS[6],
               aug: forecastData.m_Gross_Profit_cons_standard_COGS[7],
               sept: forecastData.m_Gross_Profit_cons_standard_COGS[8],
               oct: forecastData.m_Gross_Profit_cons_standard_COGS[9],
               nov: forecastData.m_Gross_Profit_cons_standard_COGS[10],
               dec: forecastData.m_Gross_Profit_cons_standard_COGS[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Gross_Profit_cons_standard_COGS),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 4,
               account: "Variances",
               jan: forecastData.m_Variances[0],
               feb: forecastData.m_Variances[1],
               march: forecastData.m_Variances[2],
               april: forecastData.m_Variances[3],
               may: forecastData.m_Variances[4],
               june: forecastData.m_Variances[5],
               july: forecastData.m_Variances[6],
               aug: forecastData.m_Variances[7],
               sept: forecastData.m_Variances[8],
               oct: forecastData.m_Variances[9],
               nov: forecastData.m_Variances[10],
               dec: forecastData.m_Variances[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Variances),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 5,
               account: "Warrany Expenses",
               jan: forecastData.m_Warranty_Expenses[0],
               feb: forecastData.m_Warranty_Expenses[1],
               march: forecastData.m_Warranty_Expenses[2],
               april: forecastData.m_Warranty_Expenses[3],
               may: forecastData.m_Warranty_Expenses[4],
               june: forecastData.m_Warranty_Expenses[5],
               july: forecastData.m_Warranty_Expenses[6],
               aug: forecastData.m_Warranty_Expenses[7],
               sept: forecastData.m_Warranty_Expenses[8],
               oct: forecastData.m_Warranty_Expenses[9],
               nov: forecastData.m_Warranty_Expenses[10],
               dec: forecastData.m_Warranty_Expenses[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Warranty_Expenses),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 6,
               account: "Inventory Write Down",
               jan: forecastData.m_Inventory_write_down[0],
               feb: forecastData.m_Inventory_write_down[1],
               march: forecastData.m_Inventory_write_down[2],
               april: forecastData.m_Inventory_write_down[3],
               may: forecastData.m_Inventory_write_down[4],
               june: forecastData.m_Inventory_write_down[5],
               july: forecastData.m_Inventory_write_down[6],
               aug: forecastData.m_Inventory_write_down[7],
               sept: forecastData.m_Inventory_write_down[8],
               oct: forecastData.m_Inventory_write_down[9],
               nov: forecastData.m_Inventory_write_down[10],
               dec: forecastData.m_Inventory_write_down[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Inventory_write_down),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 7,
               account: "Additions to Other Provisions",
               jan: forecastData.m_Additions_to_other_provisions[0],
               feb: forecastData.m_Additions_to_other_provisions[1],
               march: forecastData.m_Additions_to_other_provisions[2],
               april: forecastData.m_Additions_to_other_provisions[3],
               may: forecastData.m_Additions_to_other_provisions[4],
               june: forecastData.m_Additions_to_other_provisions[5],
               july: forecastData.m_Additions_to_other_provisions[6],
               aug: forecastData.m_Additions_to_other_provisions[7],
               sept: forecastData.m_Additions_to_other_provisions[8],
               oct: forecastData.m_Additions_to_other_provisions[9],
               nov: forecastData.m_Additions_to_other_provisions[10],
               dec: forecastData.m_Additions_to_other_provisions[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Additions_to_other_provisions),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 8,
               account: "Risks",
               jan: forecastData.m_Risks[0],
               feb: forecastData.m_Risks[1],
               march: forecastData.m_Risks[2],
               april: forecastData.m_Risks[3],
               may: forecastData.m_Risks[4],
               june: forecastData.m_Risks[5],
               july: forecastData.m_Risks[6],
               aug: forecastData.m_Risks[7],
               sept: forecastData.m_Risks[8],
               oct: forecastData.m_Risks[9],
               nov: forecastData.m_Risks[10],
               dec: forecastData.m_Risks[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Risks),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 9,
               account: "Sum of Variances & Risks",
               jan: forecastData.m_Sum_of_Variances_and_risks[0],
               feb: forecastData.m_Sum_of_Variances_and_risks[1],
               march: forecastData.m_Sum_of_Variances_and_risks[2],
               april: forecastData.m_Sum_of_Variances_and_risks[3],
               may: forecastData.m_Sum_of_Variances_and_risks[4],
               june: forecastData.m_Sum_of_Variances_and_risks[5],
               july: forecastData.m_Sum_of_Variances_and_risks[6],
               aug: forecastData.m_Sum_of_Variances_and_risks[7],
               sept: forecastData.m_Sum_of_Variances_and_risks[8],
               oct: forecastData.m_Sum_of_Variances_and_risks[9],
               nov: forecastData.m_Sum_of_Variances_and_risks[10],
               dec: forecastData.m_Sum_of_Variances_and_risks[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Sum_of_Variances_and_risks),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 10,
               account: "Gross Profit",
               jan: forecastData.m_Gross_Profit_cons[0],
               feb: forecastData.m_Gross_Profit_cons[1],
               march: forecastData.m_Gross_Profit_cons[2],
               april: forecastData.m_Gross_Profit_cons[3],
               may: forecastData.m_Gross_Profit_cons[4],
               june: forecastData.m_Gross_Profit_cons[5],
               july: forecastData.m_Gross_Profit_cons[6],
               aug: forecastData.m_Gross_Profit_cons[7],
               sept: forecastData.m_Gross_Profit_cons[8],
               oct: forecastData.m_Gross_Profit_cons[9],
               nov: forecastData.m_Gross_Profit_cons[10],
               dec: forecastData.m_Gross_Profit_cons[11],
               originalYearTotal: calculateOriginalYearTotal(forecastData.m_Gross_Profit_cons),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
     ]);

     const handleRowEdit = (updatedRowValues) => {
          let newData = { ...rowData };
          let newRowValuesArray = [];
          for (const month of months) {
               if (updatedRowValues.hasOwnProperty(month)) {
                    newRowValuesArray.push(parseInt(updatedRowValues[month]));
               }
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
          }

          rows.forEach((row) => {
               if (row.id === 3) {
                    months.forEach((month, index) => {
                         row[month] = newData.m_Sales_Revenues_LC[index] - newData.m_Factory_CoGs[index];
                    });
               } else if (row.id === 8) {
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Warranty_Expenses[index] +
                              newData.m_Inventory_write_down[index] +
                              newData.m_Additions_to_other_provisions[index];
                    });
               } else if (row.id === 9) {
                    months.forEach((month, index) => {
                         row[month] =
                              newData.m_Variances[index] +
                              newData.m_Warranty_Expenses[index] +
                              newData.m_Inventory_write_down[index] +
                              newData.m_Additions_to_other_provisions[index];
                    });
               } else if (row.id === 10) {
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
               return row;
          });
     };

     const [quarterSelection, setQuarterSelection] = useState([]);
     const names = ["Q1", "Q2", "Q3", "Q4"];
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

     // useEffect(() => {
     //      fetchData();
     // }, [selectedProduct]);

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
               <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                    <Select
                         labelId="demo-multiple-chip-label"
                         id="demo-multiple-chip"
                         multiple
                         value={quarterSelection}
                         onChange={handleChange}
                         input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                         renderValue={(selected) => (
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                   {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                   ))}
                              </Box>
                         )}
                    >
                         {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                   {name}
                              </MenuItem>
                         ))}
                    </Select>
               </FormControl>
               <DataGrid
                    sx={{
                         "& .MuiDataGrid-columnHeaderTitle": {
                              whiteSpace: "normal",
                              lineHeight: "normal",
                              fontWeight: "bold",
                              textAlign: "left",
                         },
                    }}
                    editMode={"row"}
                    columns={columns}
                    rows={rows}
                    processRowUpdate={(newVal, oldVal) => {
                         handleRowEdit(newVal);
                         return newVal;
                    }}
                    isCellEditable={(params) => params.row.id !== 3 && params.row.id !== 8 && params.row.id !== 9}
                    hideFooterPagination
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    slots={{ toolbar: GridToolbar }}
                    hideFooter={true}
                    rowHeight={30}
               />
          </div>
     );
};

export default FourthTryGrid;
