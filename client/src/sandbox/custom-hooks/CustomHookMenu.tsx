import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import NavItem from "../../layout/components/NavItem";
import { Box } from "@mui/material";

const CustomHookMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Box>
          <NavItem label="custom counter" to="counter" color="black" />
          <NavItem label="custom user" to="user" color="black" />
        </Box>
      </AppBar>

      <Outlet />
    </>
  );
};

export default CustomHookMenu;
