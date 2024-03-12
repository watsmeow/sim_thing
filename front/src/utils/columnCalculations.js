export const calculateAdjustedTotalUnits = (params) => {
     const janQ2 = parseFloat(params.row.jan || 0);
     const febQ2 = parseFloat(params.row.feb || 0);
     const marchQ2 = parseFloat(params.row.march || 0);
     return janQ2 + febQ2 + marchQ2;
};

export const calculateAbsChange = (params) => {
     const janQ2 = parseFloat(params.row.jan || 0);
     const febQ2 = parseFloat(params.row.feb || 0);
     const marchQ2 = parseFloat(params.row.march || 0);
     return janQ2 + febQ2 + marchQ2 - params.row.originalYearTotal;
};

export const calculatePercentChange = (params) => {
     const janQ2 = parseFloat(params.row.jan || 0);
     const febQ2 = parseFloat(params.row.feb || 0);
     const marchQ2 = parseFloat(params.row.march || 0);
     const absChange = janQ2 + febQ2 + marchQ2 - params.row.originalYearTotal;
     return parseInt((absChange / (janQ2 + febQ2 + marchQ2)) * 100) + "%";
};
