import React, { useState } from 'react';

const DropdownSelector = () => {
  const [selectedOption, setSelectedOption] = useState('ALL_MED');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="ALL_MED">ALL_MED</option>
        <option value="BU_ODX">BU_ODX</option>
        <option value="BU_RAD">BU_RAD</option>
        <option value="BU_REF">BU_REF</option>
        <option value="BU_VIZ">BU_VIZ</option>
        <option value="SBU_MCS">SBU_MCS</option>
        <option value="SBU_OPT">SBU_OPT</option>
      </select>
    </div>
  );
};

export default DropdownSelector;