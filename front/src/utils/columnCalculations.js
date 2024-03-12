export const months = ["oct", "nov", "dec", "jan", "feb", "march", "april", "may", "june", "july", "aug", "sept"];

export const calculateOriginalYearTotal = (inputArray) => {
     return inputArray.slice(0, 12).reduce((acc, currentValue) => acc + currentValue, 0);
};

export const calculateAdjustedTotalUnits = (params) => {
     let sum = 0;
     for (const month of months) {
          if (params.row.hasOwnProperty(month)) {
               sum += parseInt(params.row[month]);
          }
     }
     return sum;
};

export const calculateAbsChange = (params) => {
     return calculateAdjustedTotalUnits(params) - params.row.originalYearTotal;
};

export const calculatePercentChange = (params) => {
     const sum = calculateAdjustedTotalUnits(params);
     const absChange = sum - params.row.originalYearTotal;
     return parseInt((absChange / sum) * 100) + "%";
};
