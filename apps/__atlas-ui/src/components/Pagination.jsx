import React from "react";
import Pagination from "@mui/material/Pagination";

export default function AppPagination({ page, count, onChange }) {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={(_, v)=>onChange(v)}
      color="primary"
      sx={{ my:2, display:"flex", justifyContent:"center" }}
    />
  );
}
