import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavItem from "./../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Box } from "@mui/material";

const Memoization = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Box>
          <NavItem
            label="usecallback"
            to={SANDBOX_ROUTES.USECALLBACK}
            color="black"
          />
          <NavItem label="use memo" to={SANDBOX_ROUTES.USEMEMO} color="black" />
        </Box>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Memoization;
