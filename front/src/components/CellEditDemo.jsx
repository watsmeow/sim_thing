import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export default function CellEditingDemo() {
     const [products, setProducts] = useState(null);
     const [editedValues, setEditedValues] = useState({});

     const columns = [
          { field: "code", header: "Code" },
          { field: "name", header: "Name" },
          { field: "quantity", header: "Quantity" },
          { field: "price", header: "Price" },
     ];

     useEffect(() => {
          // Sample product data
          const sampleProducts = [
               { code: "001", name: "Product 1", quantity: 10, price: 100 },
               { code: "002", name: "Product 2", quantity: 20, price: 200 },
               { code: "003", name: "Product 3", quantity: 15, price: 150 },
               { code: "004", name: "Product 4", quantity: 8, price: 80 },
               { code: "005", name: "Product 5", quantity: 12, price: 120 },
          ];

          // Calculate total price for products with code 001 or 002
          const totalPrice = sampleProducts.reduce((total, product) => total + (editedValues[product.code]?.price ?? product.price), 0);

          // Add the total row
          const updatedProducts = [...sampleProducts, { code: "total", name: "", quantity: "", price: totalPrice }];

          setProducts(updatedProducts);
     }, [editedValues]);

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
               case "price":
                    if (isPositiveInteger(newValue)) rowData[field] = newValue;
                    else event.preventDefault();
                    break;

               default:
                    if (newValue.trim().length > 0) rowData[field] = newValue;
                    else event.preventDefault();
                    break;
          }

          setEditedValues((prev) => ({
               ...prev,
               [rowData.code]: { ...prev[rowData.code], [field]: newValue },
          }));
     };

     const cellEditor = (options) => {
          if (options.field === "price") return priceEditor(options);
          else return textEditor(options);
     };

     const textEditor = (options) => {
          return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
     };

     const priceEditor = (options) => {
          return (
               <InputNumber
                    value={options.value}
                    onValueChange={(e) => options.editorCallback(e.value)}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
               />
          );
     };

     const priceBodyTemplate = (rowData) => {
          return new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "USD",
          }).format(rowData.price);
     };

     return (
          <div className="card p-fluid">
               <DataTable value={products} editMode="cell" tableStyle={{ minWidth: "50rem" }}>
                    {columns.map(({ field, header }) => {
                         return (
                              <Column
                                   key={field}
                                   field={field}
                                   header={header}
                                   style={{ width: "25%" }}
                                   body={field === "price" && priceBodyTemplate}
                                   editor={(options) => cellEditor(options)}
                                   onCellEditComplete={onCellEditComplete}
                              />
                         );
                    })}
               </DataTable>
          </div>
     );
}
