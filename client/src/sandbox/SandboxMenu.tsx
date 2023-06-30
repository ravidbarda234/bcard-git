import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import NavItem from "../layout/components/NavItem";
import ROUTES, { SANDBOX_ROUTES } from "../routes/routesModel";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../users/providers/UserProviders";

const SandboxMenu = () => {
  const { user } = useUser();
  if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem
            label="component"
            to={SANDBOX_ROUTES.COMPONENT}
            color="black"
          />
          <NavItem
            label="lifecycle hook"
            to={SANDBOX_ROUTES.LIFECYCLE}
            color="black"
          />
          <NavItem
            label="custom hooks"
            to={SANDBOX_ROUTES.CUSTOM}
            color="black"
          />
          <NavItem
            label="memoization"
            to={SANDBOX_ROUTES.MEMOIZATION}
            color="black"
          />
          <NavItem label="context" to={SANDBOX_ROUTES.CONTEXT} color="black" />
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default SandboxMenu;
