import { Container } from "@mui/material";
import useForm from "../../forms/hooks/useForm";
import { INITIAL_SIGNUP_FORM } from "../helpers/initialforms/initialSignupForms";
import ROUTES from "../../routes/routesModel";
import useHandleUser from "../hooks/useHandleUser";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProviders";
import { useEffect } from "react";
import mapUserToModel from "../helpers/normaliztion/mapUserToMode";
import { useNavigate } from "react-router-dom";
import editUserSchema from "../models/joi-schema/userEditSchema";
import EditUserForm from "../components/EditUserForm";

const EditUserPage = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const { handleUpdateUser, handleGetUserInfo } = useHandleUser();

  const navigate = useNavigate();

  const { value, ...rest } = useForm(
    INITIAL_SIGNUP_FORM,
    editUserSchema,
    handleUpdateUser
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (userId)
      handleGetUserInfo(userId).then((userInfoFromService) => {
        if (user?._id !== userInfoFromService?._id)
          return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userInfoFromService!);
        setData(modeledUser);
      });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <div>
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EditUserForm
          title="edit user"
          onSubmit={onSubmit}
          onReset={handleReset}
          data={data}
          errors={errors}
          onFormChange={validateForm}
          onInputChange={handleInputChange}
          setData={setData}
        />
      </Container>
    </div>
  );
};

export default EditUserPage;
