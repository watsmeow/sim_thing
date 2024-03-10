import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import { data } from "../utils/data.js";

const DisplayType = {
     Months: 0,
     Quarter: 1,
};

const ThirdTryGrid = () => {
     const [rowData, setRowData] = useState(data);
     const [displayType, setDisplayType] = useState(DisplayType.Months);

     const calculateQ2GPTotalUnits = () => {
          const row1 = data.m_Sales_Revenues_LC.Units[0] + data.m_Sales_Revenues_LC.Units[1] + data.m_Sales_Revenues_LC.Units[2];
          const row2 = data.m_Factory_CoGs.Units[0] + data.m_Factory_CoGs.Units[1] + data.m_Factory_CoGs.Units[2];
          return row1 - row2;
     };

     const columns = [
          { field: "account", headerName: "Account", width: 200 },
          { field: "jan", headerName: "January", editable: true },
          { field: "feb", headerName: "February", editable: true },
          { field: "march", headerName: "March", editable: true },
          { field: "totalQ2", headerName: "Total Units Q2", width: 150 },
          {
               field: "adjTotalQ2",
               headerName: "Adjusted Total Units Q2",
               valueGetter: (params) => {
                    const janQ2 = parseFloat(params.row.jan || 0);
                    const febQ2 = parseFloat(params.row.feb || 0);
                    const marchQ2 = parseFloat(params.row.march || 0);
                    return janQ2 + febQ2 + marchQ2;
               },
               width: 150,
          },
          {
               field: "absChange",
               headerName: "Absolute Change",
               valueGetter: (params) => {
                    const janQ2 = parseFloat(params.row.jan || 0);
                    const febQ2 = parseFloat(params.row.feb || 0);
                    const marchQ2 = parseFloat(params.row.march || 0);
                    return janQ2 + febQ2 + marchQ2 - params.row.totalQ2;
               },
               width: 150,
          },
          // { field: "absChange", headerName: "Absolute Change", width: 150 },
     ];

     const [rows, setRows] = useState([
          {
               id: 1,
               account: "Sales Revenues LC",
               jan: rowData.m_Sales_Revenues_LC.Units[0],
               feb: rowData.m_Sales_Revenues_LC.Units[1],
               march: rowData.m_Sales_Revenues_LC.Units[2],
               totalQ2: data.m_Sales_Revenues_LC.Units[0] + data.m_Sales_Revenues_LC.Units[1] + data.m_Sales_Revenues_LC.Units[2],
               adjTotalQ2: 0,
               absChange: 0,
          },
          {
               id: 2,
               account: "Factory CoGs",
               jan: rowData.m_Factory_CoGs.Units[0],
               feb: rowData.m_Factory_CoGs.Units[1],
               march: rowData.m_Factory_CoGs.Units[2],
               totalQ2: data.m_Factory_CoGs.Units[0] + data.m_Factory_CoGs.Units[1] + data.m_Factory_CoGs.Units[2],
               adjTotalQ2: 0,
               absChange: 0,
          },
          {
               id: 3,
               account: "GP cons Standard CoGs",
               jan: rowData.m_Sales_Revenues_LC.Units[0] - rowData.m_Factory_CoGs.Units[0],
               feb: rowData.m_Sales_Revenues_LC.Units[1] - rowData.m_Factory_CoGs.Units[1],
               march: rowData.m_Sales_Revenues_LC.Units[2] - rowData.m_Factory_CoGs.Units[2],
               totalQ2: calculateQ2GPTotalUnits(),
               adjTotalQ2: 0,
               absChange: 0,
          },
     ]);

     const handleRowEdit = (updatedRowValues) => {
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
               setRowData(newData);
          } else if (updatedRowValues.id === 2) {
               newData.m_Factory_CoGs.Units[0] = jan;
               newData.m_Factory_CoGs.Units[1] = feb;
               newData.m_Factory_CoGs.Units[2] = march;
               setRowData(newData);
          }
          const updatedRows = rows.map((row) => {
               if (row.id === 3) {
                    row.jan = newData.m_Sales_Revenues_LC.Units[0] - newData.m_Factory_CoGs.Units[0];
                    row.feb = newData.m_Sales_Revenues_LC.Units[1] - newData.m_Factory_CoGs.Units[1];
                    row.march = newData.m_Sales_Revenues_LC.Units[2] - newData.m_Factory_CoGs.Units[2];
               }
               return row;
          });
     };

     const columnGroupingModel = [
          {
               groupId: "First Quarter",
               children: [{ field: "Oct2023" }, { field: "Nov2023" }, { field: "Dec2023" }],
          },
          {
               groupId: "Roll Up Comparison",
               children: [{ field: "OriginalQ1 23" }, { field: "EditedQ1 23" }],
          },
     ];

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
          <div style={{ margin: "3rem auto", width: "75%" }}>
               <FormControl sx={{ width: "200px", pb: 1 }}>
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
                         // console.log("OLD", oldVal);
                         // console.log("NEW VAL", newVal);
                         return newVal;
                    }}
                    isCellEditable={(params) => params.row.id !== 3}
                    hideFooterPagination
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={columnVisibilityModel}
               />
               ;
          </div>
     );
};

export default ThirdTryGrid;
