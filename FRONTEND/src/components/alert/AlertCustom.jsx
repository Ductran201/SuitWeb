import React from "react";
import Alert from "@mui/material/Alert";
export default function AlertCustom({ mainContent, severity }) {
  return (
    <>
      <div className="fixed bottom-0 right-0">
        <Alert variant="filled" severity={severity}>
          {mainContent}
        </Alert>
      </div>
      ;
    </>
  );
}
