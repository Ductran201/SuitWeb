import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function Choices({ listOptions, icon }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // onClick();
  };
  const handleClose = () => {
    setAnchorEl(null);
    // onClose();
  };

  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {icon}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {listOptions.map((opt, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                // opt.function(baseId);
                opt.function();
                handleClose();
              }}
              className="flex gap-3"
            >
              {opt.icon}
              {opt.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}
