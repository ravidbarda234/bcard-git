import React from "react";
import AppBar from "@mui/material/AppBar";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const ComponentMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Box>
          <NavItem
            label="template"
            to={SANDBOX_ROUTES.TEMPLATE}
            color="black"
          />
          <NavItem label="logic" to={SANDBOX_ROUTES.LOGIC} color="black" />
          <NavItem label="styles" to={SANDBOX_ROUTES.STYLES} color="black" />
        </Box>
      </AppBar>

      <Outlet />
    </>
  );
};

export default ComponentMenu;
