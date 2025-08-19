import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function NotificationSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
