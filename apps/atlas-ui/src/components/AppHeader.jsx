import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

export default function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit"><MenuIcon/></IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>学生管理システム</Typography>
      </Toolbar>
    </AppBar>
  );
}
