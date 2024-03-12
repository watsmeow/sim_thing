import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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

const DisplayType = {
     Months: 0,
     Quarter: 1,
};

const TryGrid = () => {
     //  console.log("I RERENDERED");
     const [groupedData, setGroupedData] = useState([]);
     const [selectedProduct, setSelectedProduct] = useState("No_selection");
     const [displayType, setDisplayType] = React.useState(DisplayType.Months);

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:3001/api/aggregatedData?product=${selectedProduct}`);
               setGroupedData(response.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const handleProductChange = (event) => {
          setSelectedProduct(event.target.value);
     };

     const handleSave = () => {
          console.log("Edited data:", groupedData);
     };

     useEffect(() => {
          fetchData();
     }, [selectedProduct]);

     const columns = [
          { field: "account", headerName: "Data Type", width: 200, editable: true },
          {
               field: "Oct2023",
               headerName: "October 2023",
               width: 200,
               editable: true,
               valueGetter: (params) => {
                    console.log("PARAMS", params);
                    const oct = parseFloat(params.row.Oct2023 || 0);
                    const nov = parseFloat(params.row.Nov2023 || 0);
                    const dec = parseFloat(params.row.Dec2023 || 0);
                    return oct + nov + dec;
               },
          },
          { field: "Nov2023", headerName: "November 2023", width: 200, editable: true },
          { field: "Dec2023", headerName: "December 2023", width: 200, editable: true },
          { field: "OriginalQ1 23", headerName: "Original Q1 23", width: 200 },
          {
               field: "EditedQ1 23",
               headerName: "Edited Q1 23",
               width: 200,
               valueGetter: (params) => {
                    console.log("PARAMS", params);
                    const oct = parseFloat(params.row.Oct2023 || 0);
                    const nov = parseFloat(params.row.Nov2023 || 0);
                    const dec = parseFloat(params.row.Dec2023 || 0);
                    return oct + nov + dec;
               },
          },
     ];

     let groupedDataHashmap = new Map();

     groupedData.forEach((item) => {
          const { Data_type, FormattedMonth, TotalUnits } = item;
          if (!groupedDataHashmap.has(Data_type)) {
               // If the key doesn't exist, create a new array to hold values
               groupedDataHashmap.set(Data_type, [{ FormattedMonth, TotalUnits }]);
          } else {
               // If the key already exists, push the new value to the existing array
               groupedDataHashmap.get(Data_type).push({ FormattedMonth, TotalUnits });
          }
     });

     console.log(groupedDataHashmap);

     const rows = staticDataTypes.map((dataType, index) => {
          const rowData = { id: index, account: dataType };
          let originalQ1Sum = 0;

          const thing = groupedDataHashmap.get(dataType);
          if (thing != null) {
               for (let row of thing) {
                    const monthName = new Date(row.FormattedMonth).toLocaleString("en-US", { month: "short" });
                    const year = row.FormattedMonth.split("-")[0];
                    const monthYear = `${monthName}${year}`;

                    if (dataType == "02_Gross_Profit_cons_standard_COGS") {
                         const sales = groupedDataHashmap
                              .get("00_Sales_Revenues_LC")
                              .filter((item) => item.FormattedMonth === row.FormattedMonth)[0]?.TotalUnits;
                         const cogs = groupedDataHashmap
                              .get("01_Factory_CoGs")
                              .filter((item) => item.FormattedMonth === row.FormattedMonth)[0]?.TotalUnits;
                         console.log("sales", sales);
                         rowData[monthYear] = parseFloat(sales) - parseFloat(cogs);
                    } else {
                         rowData[monthYear] = row.TotalUnits;
                         if (monthYear === "Oct2023" || monthYear === "Nov2023" || monthYear === "Dec2023") {
                              originalQ1Sum += row.TotalUnits;
                         }
                    }
               }
          }
          //   // Iterate over groupedData to find the values for columns Oct2023, Nov2023, and Dec2023
          //   groupedData.forEach((data) => {
          //        if (data.Data_type === dataType) {
          //             const monthName = new Date(data.FormattedMonth).toLocaleString("en-US", { month: "short" });
          //             const year = data.FormattedMonth.split("-")[0];
          //             const monthYear = `${monthName}${year}`;
          //             rowData[monthYear] = data.TotalUnits;
          //             if (monthYear === "Oct2023" || monthYear === "Nov2023" || monthYear === "Dec2023") {
          //                  originalQ1Sum += data.TotalUnits;
          //             }
          //        }
          //   });

          rowData["OriginalQ1 23"] = originalQ1Sum;

          return rowData;
     });

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
                    Oct2023: true,
                    Nov2023: true,
                    Dec2023: true,
               };
          }
          return {
               Oct2023: false,
               Nov2023: false,
               Dec2023: false,
          };
     }, [displayType]);

     return (
          <div>
               <h1>A BIG TABLE</h1>
               <div>
                    <label htmlFor="dropdown">Select SBU: </label>
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
               <FormControl sx={{ width: "200px", pb: 1 }}>
                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
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
               <div style={{ width: "90%" }}>
                    <Container>
                         <DataGrid
                              rows={rows}
                              columns={columns}
                              experimentalFeatures={{ columnGrouping: true }}
                              columnGroupingModel={columnGroupingModel}
                              slots={{ toolbar: GridToolbar }}
                              hideFooterPagination
                              columnVisibilityModel={columnVisibilityModel}
                              isCellEditable={(params) =>
                                   params.row.account !== "02_Gross_Profit_cons_standard_COGS" &&
                                   params.row.account !== "03_Sum_of_Variances_and_risks" &&
                                   params.row.account !== "05_Risks" &&
                                   params.row.account !== "09_Gross_Profit_cons" &&
                                   params.row.account !== "10_Operating_Expenses" &&
                                   params.row.account !== "14_Market_Contribution"
                              }
                         />
                    </Container>
               </div>
               <button onClick={handleSave}>Save</button>
          </div>
     );
};

export default TryGrid;
