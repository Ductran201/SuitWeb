import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectCustom = (
  { label, data, onChange, value, error, helperText },
  ref
) => {
  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        ref={ref} // Forward the ref to the Select component
        value={value ?? ""}
        label={label}
        onChange={onChange}
        error={error}
      >
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <p className="text-red-500 text-sm mt-1">{helperText}</p>}
    </FormControl>
  );
};

export default React.forwardRef(SelectCustom);
