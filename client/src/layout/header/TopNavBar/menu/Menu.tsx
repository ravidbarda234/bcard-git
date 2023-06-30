import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

// import useUsers from "../../../../users/hooks/useUsers";
import MenuLink from "./MenuLink";
import ROUTES from "../../../../routes/routesModel";
import useHandleUser from "../../../../users/hooks/useHandleUser";
import { useUser } from "../../../../users/providers/UserProviders";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  anchorEl: HTMLElement;
  UserId?: string;
  onClose: () => void;
};

const Menu: React.FC<Props> = ({ isOpen, anchorEl, onClose, UserId }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { handleLogout } = useHandleUser();

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        <MenuLink
          label="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <MenuLink
              label="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              label="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        )}
        {user && (
          <>
            <MenuLink
              label="favorite card"
              navigateTo={ROUTES.FAV_CARDS}
              onClick={onClose}
            />
            <MenuLink
              label="my cards"
              navigateTo={ROUTES.MY_CARDS}
              onClick={onClose}
            />
            <MenuLink
              label="profile"
              navigateTo={`${ROUTES.PROFILE}/${user._id}`}
              onClick={onClose}
            />

            <MenuLink
              label="edit account"
              navigateTo={`${ROUTES.EDIT_USER}/${user._id}`}
              onClick={onClose}
            />

            <MenuLink
              label="logout"
              navigateTo={ROUTES.LOGIN}
              onClick={onLogout}
            />
          </>
        )}
        {user?.isAdmin && (
          <>
            <MenuLink
              label="Sandbox"
              navigateTo={ROUTES.SANDBOX}
              onClick={onClose}
            />
            <MenuLink
              label="CRM"
              navigateTo={`${ROUTES.USERS_PAGE}`}
              onClick={onClose}
            />
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
