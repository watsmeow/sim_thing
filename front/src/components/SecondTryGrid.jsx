import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

const data = {
     "001": {
          TopRow: 5,
          BottomRow: 10,
     },
     "002": {
          TopRow: 15,
          BottomRow: 20,
     },
};

const SecondTryGrid = () => {
     const [rowData, setRowData] = useState(data);

     const populateTopLeftCell = () => {
          // console.log("HI");
          let obj1 = rowData["001"];
          // consolse.log("OBJECT1TOPROW", obj1.TopRow);
          return obj1 ? obj1.TopRow : null;
     };

     const populateBottomLeftCell = () => {
          const obj1 = rowData["001"];
          return obj1 ? obj1.BottomRow : null;
     };

     const populateTopRightCell = () => {
          const obj1 = rowData["002"];
          return obj1 ? obj1.TopRow : null;
     };

     const populateBottomRightCell = () => {
          const obj1 = rowData["002"];
          return obj1 ? obj1.BottomRow : null;
     };

     const doMathTopRow = () => {
          const obj1 = rowData["001"];
          const units1Value = obj1 ? obj1.TopRow : null;
          const obj2 = rowData["001"];
          const units2Value = obj2 ? obj2.BottomRow : null;
          return (units1Value || 0) + (units2Value || 0);
     };

     const doMathBottomRow = () => {
          const obj1 = rowData["002"];
          const units1Value = obj1 ? obj1.TopRow : null;
          const obj2 = rowData["002"];
          const units2Value = obj2 ? obj2.BottomRow : null;
          return (units1Value || 0) + (units2Value || 0);
     };

     const columns = [
          { field: "name", headerName: "name", width: 200 },
          { field: "units1", headerName: "units1", editable: true },
          { field: "units2", headerName: "units2", editable: true },
          {
               field: "totalUnits",
               headerName: "totalUnits",
               valueGetter: (params) => {
                    const unitsOne = parseFloat(params.row.units1 || 0);
                    const unitsTwo = parseFloat(params.row.units2 || 0);
                    return unitsOne + unitsTwo;
               },
          },
     ];

     const [rows, setRows] = useState([
          {
               id: 1,
               name: "first",
               units1: populateTopLeftCell(),
               units2: populateTopRightCell(),
               totalUnits: 0,
          },
          {
               id: 2,
               name: "second",
               units1: populateBottomLeftCell(),
               units2: populateBottomRightCell(),
               totalUnits: 0,
          },
          {
               id: 3,
               name: "thisRowTotals",
               units1: doMathTopRow(),
               units2: doMathBottomRow(),
               totalUnits: 0,
          },
     ]);

     const handleRowEdit = (updatedRowValues) => {
          console.log(`updatedRowValues ${updatedRowValues.id}`);
          const unitsOne = parseInt(updatedRowValues.units1);
          const unitsTwo = parseInt(updatedRowValues.units2);
          let newData = { ...rowData };
          console.log(newData);
          if (updatedRowValues.id === 1) {
               newData = {
                    "001": {
                         TopRow: unitsOne,
                         BottomRow: rowData["001"].BottomRow,
                    },
                    "002": {
                         TopRow: unitsTwo,
                         BottomRow: rowData["002"].BottomRow,
                    },
               };
               setRowData(newData);
               // return newData
          } else if (updatedRowValues.id === 2) {
               newData = {
                    "001": {
                         TopRow: rowData["001"].TopRow,
                         BottomRow: unitsOne,
                    },
                    "002": {
                         TopRow: rowData["002"].TopRow,
                         BottomRow: unitsTwo,
                    },
               };
               setRowData(newData);
          }

          const updatedRows = rows.map((row) => {
               if (row.name === "thisRowTotals") {
                    row.units1 = newData["001"].TopRow + newData["001"].BottomRow;
                    row.units2 = newData["002"].TopRow + newData["002"].BottomRow;
                    row.totalUnits = row.units1 + row.units2;
               }
               return row;
          });

          // setRows(updatedRows);
          // data = { ...newData };
          // setRowData(data);
     };

     return (
          <div style={{ margin: "3rem auto", width: "50%" }}>
               <DataGrid
                    editMode={"row"}
                    columns={columns}
                    rows={rows}
                    // onRowClick={handleEvent}
                    processRowUpdate={(newVal, oldVal) => {
                         handleRowEdit(newVal);
                         // console.log("OLD", oldVal);
                         // console.log("NEW VAL", newVal);
                         return newVal;
                    }}
                    isCellEditable={(params) => params.row.id !== 3}
               />
          </div>
     );
};

export default SecondTryGrid;
