const data = {
     "00_Sales_Revenues_LC": {
          "SSC China/HK": {
               BU_VIZ: {
                    2021: {
                         October: [{ Units: 2001.3487294321953, Units_forecasted: 5174.060937892211, Date: "2021-10-11T00:00:00.000Z" }],
                         November: [{ Units: 1889.4440251445517, Units_forecasted: 2881.2781199754436, Date: "2021-11-06T00:00:00.000Z" }],
                    },
               },
          },
          "SSC Benelux": {
               SBU_MCS: {
                    2021: {
                         November: [{ Units: 1889.4440251445517, Units_forecasted: 2881.2781199754436, Date: "2021-11-06T00:00:00.000Z" }],
                    },
               },
          },
     },
};

function objectToNestedMap(obj) {
     const map = new Map();
     for (const key in obj) {
          if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
               map.set(key, objectToNestedMap(obj[key]));
          } else {
               map.set(key, obj[key]);
          }
     }
     return map;
}

const nestedMap = objectToNestedMap(data);

let sum = 0;
for (let ohBuddy of nestedMap.get("00_Sales_Revenues_LC").values()) {
     console.log(ohBuddy);
     for (let ohMan of ohBuddy.values()) {
          let year = ohMan.get("2021");
          let month = year.get("November")[0];
          console.log(month);
          let units = month.Units;
          sum += units;
     }
}

console.log("SUM", sum);
