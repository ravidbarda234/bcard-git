import axios from "axios";
import { useSnack } from "../providers/SnackbarProvider";
import { useUser } from "../users/providers/UserProviders";
import { useEffect } from "react";

const useAxiosInterceptors = () => {
  const snack = useSnack();
  const { token } = useUser();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;

    axios.interceptors.request.use((data) => Promise.resolve(data), null);

    axios.interceptors.response.use(null, (error: any) => {
      const exeptedError = error.response && error.response.statis >= 400;
      if (exeptedError) snack("error", error.message);

      return Promise.reject(error);
    });
  }, [token, snack]);
};

export default useAxiosInterceptors;
