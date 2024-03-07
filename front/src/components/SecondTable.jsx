import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const initialProducts = [
     { code: "001", name: 123, category: 456, quantity: 10 },
     { code: "002", name: 234, category: 567, quantity: 20 },
     { code: "003", name: 345, category: 678, quantity: 15 },
     { code: "004", name: 456, category: 789, quantity: 8 },
     { code: "005", name: 567, category: 890, quantity: 12 },
];

const SecondTable = () => {
     const [products, setProducts] = useState(initialProducts);

     const columns = [
          { field: "code", header: "Code" },
          { field: "name", header: "Name" },
          { field: "quantity", header: "Quantity" },
     ];

     useEffect(() => {
          setProducts(products);
     }, []);

     const isPositiveInteger = (val) => {
          let str = String(val);

          str = str.trim();

          if (!str) {
               return false;
          }

          str = str.replace(/^0+/, "") || "0";
          let n = Math.floor(Number(str));

          return n !== Infinity && String(n) === str && n >= 0;
     };

     const onCellEditComplete = (e) => {
          let { rowData, newValue, field, originalEvent: event } = e;

          switch (field) {
               case "quantity":
                    if (isPositiveInteger(newValue)) rowData[field] = newValue;
                    else event.preventDefault();
                    break;

               default:
                    if (newValue.trim().length > 0) rowData[field] = newValue;
                    else event.preventDefault();
                    break;
          }
     };

     const cellEditor = (options) => {
          if (options.field === "quantity") return quantityEditor(options);
          else return textEditor(options);
     };

     const textEditor = (options) => {
          return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
     };

     const quantityEditor = (options) => {
          return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="decimal" min={0} max={1000} />;
     };

     return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
               <div className="card p-fluid">
                    <DataTable value={products} editMode="cell" tableStyle={{ minWidth: "50rem" }}>
                         {columns.map(({ field, header }) => {
                              return (
                                   <Column
                                        key={field}
                                        field={field}
                                        header={header}
                                        style={{ width: "25%" }}
                                        editor={(options) => cellEditor(options)}
                                        onCellEditComplete={onCellEditComplete}
                                   />
                              );
                         })}
                    </DataTable>
               </div>
          </div>
     );
};

export default SecondTable;
