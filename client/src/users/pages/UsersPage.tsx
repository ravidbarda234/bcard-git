import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import AdminSearchBar from "../../layout/header/TopNavBar/search-bar/AdminSearchBar";
import useHandleUser from "../hooks/useHandleUser";
import { FullUserType } from "../models/types/userTypes";
import { apiUrl } from "../services/usersApiService";
import axios from "axios";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProviders";
import UserDeleteDialog from "../components/UserDeletDialog";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<FullUserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<FullUserType[]>([]);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { handleGetAllUsersInfo, handleChangeUserStatus, handleDeleteUser } =
    useHandleUser();
  const { user } = useUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    handleGetAllUsersInfo();

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("a") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.first.includes(query) ||
            user.name.last.includes(query) ||
            (user.name.middle && user.name.middle.includes(query)) ||
            user.address.city.includes(query) ||
            (user.address.street && user.address.street.includes(query)) ||
            user.address.country.includes(query) ||
            (user.address.state && user.address.state.includes(query)) ||
            String(user.address.houseNumber).includes(query) ||
            user.email.includes(query) ||
            String(user.phone).includes(query) ||
            String(user.isBusiness).includes(query)
        )
      );
    }
  }, [users, query]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserStatusChange = async (userId: string) => {
    await handleChangeUserStatus(userId);
    await handleGetAllUsersInfo();
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user._id === userId) {
          return { ...user, isBusiness: !user.isBusiness };
        }
        return user;
      })
    );
  };

  const onDelete = async (userId: string) => {
    setDeleteDialogOpen(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteUser(userIdToDelete);
    const updatedUsers = await handleGetAllUsersInfo();
    if (updatedUsers) {
      setUsers(updatedUsers);
    }
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  if (!user || !user.isAdmin) {
    return <Navigate replace to={ROUTES.CARDS} />;
  }

  return (
    <Container sx={{ textAlign: "center" }}>
      <PageHeader
        title="Site Users"
        subtitle="Here you can view all the details of your users."
      />
      <AdminSearchBar />
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ marginBottom: 6 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{`${user.address.street} ${user.address.houseNumber}, ${user.address.city}`}</TableCell>
                    <TableCell>
                      {user.isBusiness ? "Business" : "Regular"}
                      {!user.isBusiness && (
                        <Button
                          size="small"
                          color="info"
                          style={{ fontSize: "11px", fontWeight: "bold" }}
                          onClick={() => handleUserStatusChange(user._id)}
                        >
                          Change
                        </Button>
                      )}
                      {user.isBusiness && (
                        <Button
                          size="small"
                          color="secondary"
                          style={{ fontSize: "11px", fontWeight: "bold" }}
                          onClick={() => handleUserStatusChange(user._id)}
                        >
                          Change
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onDelete(user._id)}
                        disabled={user.isAdmin}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <UserDeleteDialog
        isDialogOpen={deleteDialogOpen}
        onDelete={handleConfirmDelete}
        onChangeDialog={handleCloseDeleteDialog}
      />
      ;
    </Container>
  );
};

export default UsersPage;
