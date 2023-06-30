import { useEffect, useState, useMemo, useCallback } from "react";
import {
  FullUserType,
  LoginType,
  RegistrationForm,
  TokenType,
  UserMapToModelType,
} from "../models/types/userTypes";
import { useUser } from "../providers/UserProviders";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";
import {
  ChangeUserStatus,
  apiUrl,
  deleteUser,
  editUser,
  fetchUserData,
  getAllUsersInfo,
  getUserInfo,
  login,
  signup,
} from "../services/usersApiService";
import {
  getToken,
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorage";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normaliztion/normalizeUser";
import normalizeEditUser from "../helpers/normaliztion/normalizeEditUser";
import axios from "axios";

type ErrorType = null | string;

const useHandleUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [userInfo, setUserInfo] = useState<FullUserType | null>(null);
  const [allUsersInfo, setAllUsersInfo] = useState<FullUserType[] | null>(null);
  const { setUser, setToken, user } = useUser();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilter] = useState<FullUserType[] | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const snack = useSnack();
  const [userData, setUserData] = useState<FullUserType | null>(null);

  useAxiosInterceptors();

  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: ErrorType,
      user: null | TokenType = null,
      userInfo: null | FullUserType = null,
      allUserInfo: null | FullUserType[] = null
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUserInfo(userInfo);
      setAllUsersInfo(allUserInfo);
    },
    [setUser, setUserInfo, setAllUsersInfo]
  );

  const handleLogin = useCallback(
    async (user: LoginType) => {
      try {
        if (isBlocked) {
          snack("error", "Your account is blocked. Please try again later.");
          return;
        }

        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.ROOT);
        setFailedAttempts(0);
      } catch (error) {
        if (typeof error === "string") {
          requestStatus(false, error, null);
          snack("error", "Incorrect email/password");

          setFailedAttempts((prevAttempts) => prevAttempts + 1);

          if (failedAttempts >= 2) {
            setIsBlocked(true);
            snack(
              "error",
              "Too many failed attempts. Your account is blocked for 1 minute."
            );

            setTimeout(() => setIsBlocked(false), 60 * 1000);
          }
        }
      }
    },
    [setToken, navigate, requestStatus, snack, isBlocked, failedAttempts]
  );

  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({ email: user.email, password: user.password });
        snack("success", "Welcomw to our website! enjoy:)");
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleUpdateUser = useCallback(
    async (userFromClient: UserMapToModelType) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeEditUser(userFromClient);
        const userInfoFromServer = await editUser(normalizedUser);
        setUserInfo(userInfoFromServer);
        requestStatus(false, null, null, userInfoFromServer);
        snack("success", "The user details has been successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleGetAllUsersInfo = useCallback(async () => {
    try {
      setLoading(true);
      const AllUsersInfo = await getAllUsersInfo();
      requestStatus(false, null, user, null, AllUsersInfo);
      return AllUsersInfo;
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleGetAllUserInfo = async (userId: string) => {
    try {
      setLoading(true);
      const userInfo = await getUserInfo(userId);
      requestStatus(false, null, user, userInfo);
      return userInfo;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleGetUserInfo = async (userId: string) => {
    try {
      setLoading(true);
      const userInfo = await getUserInfo(userId);
      requestStatus(false, null, user, userInfo);
      return userInfo;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleGetUserInfoToProfile = async (userId: string) => {
    try {
      setLoading(true);
      const userInfo = await fetchUserData(userId);
      requestStatus(false, null, user, userInfo);
      return userInfo;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleChangeUserStatus = useCallback(
    async (userId: string | undefined) => {
      try {
        setLoading(true);
        const user = await ChangeUserStatus(userId);
        setUserInfo(user);

        snack("success", "The user status has been successfully changed");
        return user;
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      await deleteUser(userId);
      snack("success", "The user has been successfully deleted");
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
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

  const handleDeleteUserProfile = async () => {
    try {
      await axios.delete(`${apiUrl}/users/${user?._id}`);
      setUser(null);
      removeToken();
      navigate(ROUTES.ROOT);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const value = useMemo(() => {
    return {
      isLoading,
      error,
      user,
      userInfo,
      allUsersInfo,
      filteredUsers,
      setAllUsersInfo,
      setUser,
      setUserInfo,
    };
  }, [
    isLoading,
    error,
    user,
    userInfo,
    allUsersInfo,
    filteredUsers,
    setAllUsersInfo,
    setUser,
    setUserInfo,
  ]);
  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUserInfo,
    handleUpdateUser,
    handleGetAllUsersInfo,
    handleChangeUserStatus,
    handleDeleteUser,
    handleChangeUserStatusProfile,
    handleDeleteUserProfile,
    handleGetUserInfoToProfile,
    handleGetAllUserInfo,
  };
};

export default useHandleUser;
