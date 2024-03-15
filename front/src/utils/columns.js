export const columnGroupingModel = [
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

export const updateColumns = (eventValue) => {
     console.log(eventValue);

     const quarterVisibility = {
          Q1: { oct: true, nov: true, dec: true },
          Q2: { jan: true, feb: true, march: true },
          Q3: { april: true, may: true, june: true },
          Q4: { july: true, aug: true, sept: true },
     };

     let updatedColumnVisibilityModel = {
          oct: false,
          nov: false,
          dec: false,
          jan: false,
          feb: false,
          march: false,
          april: false,
          may: false,
          june: false,
          july: false,
          aug: false,
          sept: false,
     };

     eventValue.forEach((quarter) => {
          updatedColumnVisibilityModel = { ...updatedColumnVisibilityModel, ...quarterVisibility[quarter] };
     });

     return updatedColumnVisibilityModel;
};