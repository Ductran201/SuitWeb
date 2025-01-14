import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function NativeSelectCustom({ defaultValue, data, onChange }) {
  return (
    <>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <NativeSelect
            value={defaultValue}
            variant="standard"
            onChange={(e) => onChange(e.target.value)}
          >
            {data?.map((opt, index) => (
              <option key={index} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    </>
  );
}
