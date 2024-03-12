import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { data } from "../utils/data.js";
import { calculateAdjustedTotalUnits, calculateAbsChange, calculatePercentChange } from "../utils/columnCalculations.js";

const DisplayType = {
     Months: 0,
     Quarter: 1,
};

const columnGroupingModel = [
     {
          groupId: "First Quarter",
          children: [{ field: "oct" }, { field: "nov" }, { field: "dec" }],
     },
     {
          groupId: "Second Quarter",
          children: [{ field: "jan" }, { field: "feb" }, { field: "march" }],
     },
     {
          groupId: "Third Quarter",
          children: [{ field: "april" }, { field: "may" }, { field: "june" }],
     },
     {
          groupId: "Fourth Quarter",
          children: [{ field: "july" }, { field: "aug" }, { field: "sept" }],
     },
];

// const currentFiscalYear =

const ThirdTryGrid = () => {
     const [rowData, setRowData] = useState(data);
     console.log(rowData.m_Sales_Revenues_LC.Units_forecasted);
     const [displayType, setDisplayType] = useState(DisplayType.Months);

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
          { field: "originalYearTotal", headerName: "Total Units", width: 150 },
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
               jan: rowData.m_Sales_Revenues_LC.Units[0],
               feb: rowData.m_Sales_Revenues_LC.Units[1],
               march: rowData.m_Sales_Revenues_LC.Units[2],
               originalYearTotal: data.m_Sales_Revenues_LC.Units[0] + data.m_Sales_Revenues_LC.Units[1] + data.m_Sales_Revenues_LC.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 2,
               account: "Factory CoGs",
               jan: rowData.m_Factory_CoGs.Units[0],
               feb: rowData.m_Factory_CoGs.Units[1],
               march: rowData.m_Factory_CoGs.Units[2],
               originalYearTotal: data.m_Factory_CoGs.Units[0] + data.m_Factory_CoGs.Units[1] + data.m_Factory_CoGs.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 3,
               account: "GP cons Standard CoGs",
               jan: rowData.m_Sales_Revenues_LC.Units[0] - rowData.m_Factory_CoGs.Units[0],
               feb: rowData.m_Sales_Revenues_LC.Units[1] - rowData.m_Factory_CoGs.Units[1],
               march: rowData.m_Sales_Revenues_LC.Units[2] - rowData.m_Factory_CoGs.Units[2],
               originalYearTotal: calculateOriginalQ2GPTotalUnits(),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 4,
               account: "Variances",
               jan: rowData.m_Variances.Units[0],
               feb: rowData.m_Variances.Units[1],
               march: rowData.m_Variances.Units[2],
               originalYearTotal: data.m_Variances.Units[0] + data.m_Variances.Units[1] + data.m_Variances.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 5,
               account: "Warrany Expenses",
               jan: rowData.m_Warranty_Expenses.Units[0],
               feb: rowData.m_Warranty_Expenses.Units[1],
               march: rowData.m_Warranty_Expenses.Units[2],
               originalYearTotal: data.m_Warranty_Expenses.Units[0] + data.m_Warranty_Expenses.Units[1] + data.m_Warranty_Expenses.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 6,
               account: "Inventory Write Down",
               jan: rowData.m_Inventory_write_down.Units[0],
               feb: rowData.m_Inventory_write_down.Units[1],
               march: rowData.m_Inventory_write_down.Units[2],
               originalYearTotal: data.m_Inventory_write_down.Units[0] + data.m_Inventory_write_down.Units[1] + data.m_Inventory_write_down.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 7,
               account: "Additions to Other Provisions",
               jan: rowData.m_Additions_to_other_provisions.Units[0],
               feb: rowData.m_Additions_to_other_provisions.Units[1],
               march: rowData.m_Additions_to_other_provisions.Units[2],
               originalYearTotal:
                    data.m_Additions_to_other_provisions.Units[0] +
                    data.m_Additions_to_other_provisions.Units[1] +
                    data.m_Additions_to_other_provisions.Units[2],
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 8,
               account: "Risks",
               jan: rowData.m_Warranty_Expenses.Units[0] + rowData.m_Inventory_write_down.Units[0] + rowData.m_Additions_to_other_provisions.Units[0],
               feb: rowData.m_Warranty_Expenses.Units[1] + rowData.m_Inventory_write_down.Units[1] + rowData.m_Additions_to_other_provisions.Units[1],
               march:
                    rowData.m_Warranty_Expenses.Units[2] + rowData.m_Inventory_write_down.Units[2] + rowData.m_Additions_to_other_provisions.Units[2],
               originalYearTotal: calculateOriginalQ2RisksTotalUnits(),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 9,
               account: "Sum of Variances & Risks",
               jan:
                    rowData.m_Variances.Units[0] +
                    (rowData.m_Warranty_Expenses.Units[0] +
                         rowData.m_Inventory_write_down.Units[0] +
                         rowData.m_Additions_to_other_provisions.Units[0]),
               feb:
                    rowData.m_Variances.Units[1] +
                    (rowData.m_Warranty_Expenses.Units[1] +
                         rowData.m_Inventory_write_down.Units[1] +
                         rowData.m_Additions_to_other_provisions.Units[1]),
               march:
                    rowData.m_Variances.Units[2] +
                    (rowData.m_Warranty_Expenses.Units[2] +
                         rowData.m_Inventory_write_down.Units[2] +
                         rowData.m_Additions_to_other_provisions.Units[2]),
               originalYearTotal: calculateOriginalQ2SumOfVarAndRisksTotalUnits(),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
          {
               id: 10,
               account: "Gross Profit",
               jan: calculateGrossProfitJan(),
               feb: calculateGrossProfitFeb(),
               march: calculateGrossProfitMarch(),
               originalYearTotal: calculateOriginalQ2GrossProfit(),
               adjTotal: 0,
               absChange: 0,
               percentChange: 0,
          },
     ]);

     const handleRowEdit = (updatedRowValues) => {
          console.log(`updated row value ${updatedRowValues.jan}`);
          const rowId = updatedRowValues.id;
          // const accountType;
          let newData = { ...rowData };
          // switch (updatedRowValues.account) {
          //      case "Sales Revenues LC":
          //           accountType = newData.m_Sales_Revenues_LC;
          //      case "Factory CoGs":
          //           accountType = newData.m_Factory_CoGs;
          //      default:
          //           accountType = asdfsdf
          // }
          const jan = parseInt(updatedRowValues.jan);
          const feb = parseInt(updatedRowValues.feb);
          const march = parseInt(updatedRowValues.march);

          if (updatedRowValues.id === 1) {
               newData.m_Sales_Revenues_LC.Units[0] = jan;
               newData.m_Sales_Revenues_LC.Units[1] = feb;
               newData.m_Sales_Revenues_LC.Units[2] = march;
               // setRowData(newData);
          } else if (updatedRowValues.id === 2) {
               newData.m_Factory_CoGs.Units[0] = jan;
               newData.m_Factory_CoGs.Units[1] = feb;
               newData.m_Factory_CoGs.Units[2] = march;
               // setRowData(newData);
          } else if (updatedRowValues.id === 4) {
               newData.m_Variances.Units[0] = jan;
               newData.m_Variances.Units[1] = feb;
               newData.m_Variances.Units[2] = march;
          } else if (updatedRowValues.id === 5) {
               newData.m_Warranty_Expenses.Units[0] = jan;
               newData.m_Warranty_Expenses.Units[1] = feb;
               newData.m_Warranty_Expenses.Units[2] = march;
          } else if (updatedRowValues.id === 6) {
               newData.m_Inventory_write_down.Units[0] = jan;
               newData.m_Inventory_write_down.Units[1] = feb;
               newData.m_Inventory_write_down.Units[2] = march;
          } else if (updatedRowValues.id === 7) {
               newData.m_Additions_to_other_provisions.Units[0] = jan;
               newData.m_Additions_to_other_provisions.Units[1] = feb;
               newData.m_Additions_to_other_provisions.Units[2] = march;
          }
          const updatedRows = rows.map((row) => {
               if (row.id === 3) {
                    row.jan = newData.m_Sales_Revenues_LC.Units[0] - newData.m_Factory_CoGs.Units[0];
                    row.feb = newData.m_Sales_Revenues_LC.Units[1] - newData.m_Factory_CoGs.Units[1];
                    row.march = newData.m_Sales_Revenues_LC.Units[2] - newData.m_Factory_CoGs.Units[2];
               } else if (row.id === 8) {
                    row.jan =
                         newData.m_Warranty_Expenses.Units[0] +
                         newData.m_Inventory_write_down.Units[0] +
                         newData.m_Additions_to_other_provisions.Units[0];
                    row.feb =
                         newData.m_Warranty_Expenses.Units[1] +
                         newData.m_Inventory_write_down.Units[1] +
                         newData.m_Additions_to_other_provisions.Units[1];
                    row.march =
                         newData.m_Warranty_Expenses.Units[2] +
                         newData.m_Inventory_write_down.Units[2] +
                         newData.m_Additions_to_other_provisions.Units[2];
               } else if (row.id === 9) {
                    row.jan =
                         newData.m_Variances.Units[0] +
                         newData.m_Warranty_Expenses.Units[0] +
                         newData.m_Inventory_write_down.Units[0] +
                         newData.m_Additions_to_other_provisions.Units[0];
                    row.feb =
                         newData.m_Variances.Units[1] +
                         newData.m_Warranty_Expenses.Units[1] +
                         newData.m_Inventory_write_down.Units[1] +
                         newData.m_Additions_to_other_provisions.Units[1];
                    row.march =
                         newData.m_Variances.Units[2] +
                         newData.m_Warranty_Expenses.Units[2] +
                         newData.m_Inventory_write_down.Units[2] +
                         newData.m_Additions_to_other_provisions.Units[2];
               } else if (row.id === 10) {
                    const january =
                         rowData.m_Sales_Revenues_LC.Units[0] -
                         rowData.m_Factory_CoGs.Units[0] -
                         (rowData.m_Variances.Units[0] +
                              (rowData.m_Warranty_Expenses.Units[0] +
                                   rowData.m_Inventory_write_down.Units[0] +
                                   rowData.m_Additions_to_other_provisions.Units[0]));
                    const february =
                         rowData.m_Sales_Revenues_LC.Units[1] -
                         rowData.m_Factory_CoGs.Units[1] -
                         (rowData.m_Variances.Units[1] +
                              (rowData.m_Warranty_Expenses.Units[1] +
                                   rowData.m_Inventory_write_down.Units[1] +
                                   rowData.m_Additions_to_other_provisions.Units[1]));
                    const march =
                         rowData.m_Sales_Revenues_LC.Units[2] -
                         rowData.m_Factory_CoGs.Units[2] -
                         (rowData.m_Variances.Units[2] +
                              (rowData.m_Warranty_Expenses.Units[2] +
                                   rowData.m_Inventory_write_down.Units[2] +
                                   rowData.m_Additions_to_other_provisions.Units[2]));
                    row.jan = january;
                    row.feb = february;

                    row.march = march;
               }
               return row;
          });
     };

     const columnVisibilityModel = React.useMemo(() => {
          if (displayType === DisplayType.Months) {
               return {
                    jan: true,
                    feb: true,
                    march: true,
               };
          }
          return {
               jan: false,
               feb: false,
               march: false,
          };
     }, [displayType]);
     return (
          <div style={{ margin: "3rem auto", width: "fit-content" }}>
               <FormControl sx={{ width: "100px", pb: 1 }}>
                    <InputLabel id="demo-simple-select-label">Display Type</InputLabel>
                    <Select
                         labelId="display-type-label"
                         id="display-type"
                         value={displayType}
                         label="Display Type"
                         onChange={(event) => {
                              setDisplayType(event.target.value);
                         }}
                    >
                         <MenuItem value={DisplayType.Months}>Months</MenuItem>
                         <MenuItem value={DisplayType.Quarter}>Quarter</MenuItem>
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
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
                    columnVisibilityModel={columnVisibilityModel}
                    slots={{ toolbar: GridToolbar }}
                    hideFooter={true}
                    rowHeight={30}
               />
               ;
          </div>
     );
};

export default ThirdTryGrid;
