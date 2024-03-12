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

const Quarters = {
     Q1: 0,
     Q2: 1,
     Q3: 2,
     Q4: 3,
     None: 4,
};

const FourthTryGrid = () => {
     const [rowData, setRowData] = useState(forecastData);
     const [quarterSelection, setQuarterSelection] = useState(Quarters.None);
     //  const [quarterSelection, setQuarterSelection] = useState([]);

     const calculateOriginalQ2GPTotalUnits = () => {
          const row1 = data.m_Sales_Revenues_LC.Units[0] + data.m_Sales_Revenues_LC.Units[1] + data.m_Sales_Revenues_LC.Units[2];
          const row2 = data.m_Factory_CoGs.Units[0] + data.m_Factory_CoGs.Units[1] + data.m_Factory_CoGs.Units[2];
          return row1 - row2;
     };

     const calculateOriginalQ2RisksTotalUnits = () => {
          const row1 = data.m_Warranty_Expenses.Units[0] + data.m_Warranty_Expenses.Units[1] + data.m_Warranty_Expenses.Units[2];
          const row2 = data.m_Inventory_write_down.Units[0] + data.m_Inventory_write_down.Units[1] + data.m_Inventory_write_down.Units[2];
          const row3 =
               data.m_Additions_to_other_provisions.Units[0] +
               data.m_Additions_to_other_provisions.Units[1] +
               data.m_Additions_to_other_provisions.Units[2];
          return row1 + row2 + row3;
     };

     const calculateOriginalQ2SumOfVarAndRisksTotalUnits = () => {
          const row1 = data.m_Variances.Units[0] + data.m_Variances.Units[1] + data.m_Variances.Units[2];
          const row2 = calculateOriginalQ2RisksTotalUnits();
          return row1 + row2;
     };

     const calculateGrossProfitJan = () => {
          const jan =
               rowData.m_Sales_Revenues_LC.Units[0] -
               rowData.m_Factory_CoGs.Units[0] -
               (rowData.m_Variances.Units[0] +
                    (rowData.m_Warranty_Expenses.Units[0] +
                         rowData.m_Inventory_write_down.Units[0] +
                         rowData.m_Additions_to_other_provisions.Units[0]));
          return jan;
     };

     const calculateGrossProfitFeb = () => {
          const jan =
               rowData.m_Sales_Revenues_LC.Units[1] -
               rowData.m_Factory_CoGs.Units[1] -
               (rowData.m_Variances.Units[1] +
                    (rowData.m_Warranty_Expenses.Units[1] +
                         rowData.m_Inventory_write_down.Units[1] +
                         rowData.m_Additions_to_other_provisions.Units[1]));
          return jan;
     };

     const calculateGrossProfitMarch = () => {
          const march =
               rowData.m_Sales_Revenues_LC.Units[2] -
               rowData.m_Factory_CoGs.Units[2] -
               (rowData.m_Variances.Units[2] +
                    (rowData.m_Warranty_Expenses.Units[2] +
                         rowData.m_Inventory_write_down.Units[2] +
                         rowData.m_Additions_to_other_provisions.Units[2]));
          return march;
     };

     const calculateOriginalQ2GrossProfit = () => {
          return calculateGrossProfitJan() + calculateGrossProfitFeb() + calculateGrossProfitMarch();
     };
     const columns = [
          { field: "account", headerName: "Account", width: 200, width: 200 },
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
          { field: "originalYearTotal", headerName: "Total Units", width: 75 },
          {
               field: "adjTotal",
               headerName: "Adjusted Total Units",
               valueGetter: calculateAdjustedTotalUnits,
               width: 75,
          },
          {
               field: "absChange",
               headerName: "Absolute Change",
               valueGetter: calculateAbsChange,
               width: 75,
          },
          {
               field: "percentChange",
               headerName: "Percent Change",
               valueGetter: calculatePercentChange,
               width: 75,
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

     const columnVisibilityModel = useMemo(() => {
          if (quarterSelection === Quarters.Q1) {
               return {
                    oct: true,
                    nov: true,
                    dec: true,
               };
          } else if (quarterSelection === Quarters.Q2) {
               return {
                    jan: true,
                    feb: true,
                    march: true,
               };
          } else if (quarterSelection === Quarters.Q3) {
               return {
                    april: true,
                    may: true,
                    june: true,
               };
          } else if (quarterSelection === Quarters.Q4) {
               return {
                    july: true,
                    aug: true,
                    sept: true,
               };
          }
          return {
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
          };
     }, [quarterSelection]);

     return (
          <div style={{ margin: "3rem auto", width: "fit-content" }}>
               <FormControl sx={{ width: "100px", pb: 1 }}>
                    <InputLabel id="demo-simple-select-label">Display Type</InputLabel>
                    <Select
                         labelId="display-type-label"
                         id="display-type"
                         value={quarterSelection}
                         label="Display Type"
                         onChange={(event) => {
                              setQuarterSelection(event.target.value);
                         }}
                    >
                         <MenuItem value={Quarters.Q1}>Q1</MenuItem>
                         <MenuItem value={Quarters.Q2}>Q2</MenuItem>
                         <MenuItem value={Quarters.Q3}>Q3</MenuItem>
                         <MenuItem value={Quarters.Q4}>Q4</MenuItem>
                         <MenuItem value={Quarters.None}>None</MenuItem>
                    </Select>
               </FormControl>
               <DataGrid
                    editMode={"row"}
                    columns={columns}
                    rows={rows}
                    processRowUpdate={(newVal, oldVal) => {
                         handleRowEdit(newVal);
                         return newVal;
                    }}
                    isCellEditable={(params) => params.row.id !== 3 && params.row.id !== 8 && params.row.id !== 9}
                    hideFooterPagination
                    // experimentalFeatures={{ columnGrouping: true }}
                    // columnGroupingModel={columnGroupingModel}
                    columnVisibilityModel={columnVisibilityModel}
                    slots={{ toolbar: GridToolbar }}
                    hideFooter={true}
                    rowHeight={30}
               />
          </div>
     );
};

export default FourthTryGrid;
