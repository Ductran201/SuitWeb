import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function SortByCustom({ initContent, options }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <Select
        size="small"
        sx={{ borderRadius: "10px", textAlign: "center" }}
        value={selectedOption}
        displayEmpty
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
        renderValue={(value) => (value === "" ? `${initContent}` : value)}
      >
        {options.map((option, index) => (
          <MenuItem
            onClick={option.function}
            key={index}
            value={option.content}
          >
            {option.content}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
