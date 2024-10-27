import { Close } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

export default function FormCustom({
  fields,
  onSubmit,
  onClose,
  formTitile,
  submitText,
}) {
  const handleInputChange = (e, fieldName) => {
    fields.forEach((field) => {
      if (field.name === fieldName) {
        field.onChange(e);
      }
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[300px] min-h-[250px] bg-gray-500 fixed right-[40%] p-5 top-[30%]"
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="">{formTitile}</h1>
          <Close className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex justify-center items-center flex-col gap-6">
          {fields.map((field, index) => {
            if (field.type === "text" || field.type === "textarea") {
              return (
                <TextField
                  key={index}
                  value={field.value}
                  onChange={(e) => handleInputChange(e, field.name)}
                  name={field.name}
                  size="small"
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  // multiline={field.type === "textarea"}
                ></TextField>
              );
            }

            if (field.type === "file") {
              return (
                <Button
                  key={index}
                  fullWidth
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {field.label}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleInputChange(e, field.name)}
                    // multiple={field.multiple}
                  />
                </Button>
              );
            }
            return null;
          })}

          <Button
            onClick={onSubmit}
            type="submit"
            variant="contained"
            fullWidth
          >
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
}
