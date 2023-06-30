import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProviders";
import { getUser } from "../services/localStorage";
import { apiUrl } from "../services/usersApiService";
import { FullUserType } from "../models/types/userTypes";
import axios from "axios";
import ROUTES from "../../routes/routesModel";
import useHandleUser from "../hooks/useHandleUser";
import UserDeleteDialog from "../components/UserDeletDialog";
import { removeToken, getToken } from "../services/localStorage";
import RefreshDialog from "../components/RefreshDialog";
import Spinner from "../../components/Spinner";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<FullUserType[]>([]);
  const { handleDeleteUserProfile } = useHandleUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState<FullUserType | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${user?._id}`);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangeUserStatusProfile = async () => {
    try {
      if (userData) {
        const updatedUser = { ...userData, isBusiness: !userData.isBusiness };
        await axios.put(`${apiUrl}/users/${user?._id}`, updatedUser);
        setUserData(updatedUser);
        const response = await axios.get(`${apiUrl}/users/${user?._id}`);
        setUserData(response.data);
        navigate(ROUTES.LOGIN);
        document.location.reload();
        removeToken();
        getToken();
        getUser();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container sx={{ textAlign: "center" }}>
      <PageHeader
        title="My Profile"
        subtitle={`${userData?.name?.first} ${userData?.name.last}` || ""}
      />

      {userData && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table sx={{}}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Full Name:
                    </TableCell>
                    <TableCell>{`${userData.name?.first} ${userData.name?.middle} ${userData.name?.last}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                    <TableCell>{userData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Phone:</TableCell>
                    <TableCell>{userData.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                    <TableCell>{`${userData.address?.street} ${userData.address?.houseNumber}, ${userData.address?.city}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Business:</TableCell>
                    <TableCell>{userData.isBusiness ? "Yes" : "No"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="text"
              size="small"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => setConfirmationDialogOpen(true)}
            >
              {" "}
              {userData?.isBusiness
                ? "Switch to rugular user"
                : "Become a Business"}
            </Button>
            <RefreshDialog
              isDialogOpenRefresh={confirmationDialogOpen}
              onCancel={() => setConfirmationDialogOpen(false)}
              onConfirm={handleChangeUserStatusProfile}
            />
          </Grid>
          <Grid item xs={12} md={4} justifyContent="center">
            <Box width="80%">
              <img
                style={{
                  width: "100%",
                  borderRadius: "12%",
                  objectFit: "cover",
                }}
                src={userData.image.url}
                alt={userData.image.alt}
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {user?.isBusiness && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(ROUTES.CREATE_CARD)}
        >
          Create Card!
        </Button>
      )}

      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`${ROUTES.EDIT_USER}/${user?._id}`)}
        sx={{ marginTop: 2 }}
      >
        Edit account
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          setDeleteDialogOpen(true);
          setUserIdToDelete(user?._id || "");
        }}
      >
        Delete Account
      </Button>
      <UserDeleteDialog
        isDialogOpen={deleteDialogOpen}
        onChangeDialog={() => setDeleteDialogOpen(false)}
        onDelete={handleDeleteUserProfile}
      />
    </Container>
  );
};

export default ProfilePage;
