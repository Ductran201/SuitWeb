import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Select, TextField } from "@mui/material";

export default function NativeSelectCustom({ label, data, onChange }) {
  return (
    <>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
          </InputLabel> */}
          <NativeSelect
            variant="standard"
            defaultValue={2}
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
