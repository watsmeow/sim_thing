export const calculateGPConCoGs = (newData) => {
     return newData.m_Sales_Revenues_LC.map((value, index) => value - newData.m_Factory_CoGs[index]);
};

export const calculateRisks = (newData) => {
     return newData.m_Warranty_Expenses.map(
          (value, index) => value + newData.m_Inventory_write_down[index] + newData.m_Additions_to_other_provisions[index]
     );
};

export const calculateSumOfVariancesAndRisks = (newData) => {
     return newData.m_Variances.map(
          (value, index) =>
               value + newData.m_Warranty_Expenses[index] + newData.m_Inventory_write_down[index] + newData.m_Additions_to_other_provisions[index]
     );
};

export const calculateGP = (newData) => {
     return newData.m_Sales_Revenues_LC.map(
          (value, index) => value - newData.m_Factory_CoGs[index] - calculateSumOfVariancesAndRisks(newData)[index]
     );
};
