import { Container } from "@mui/material";
import useForm from "../../forms/hooks/useForm";
import { INITIAL_SIGNUP_FORM } from "../helpers/initialforms/initialSignupForms";
import ROUTES from "../../routes/routesModel";
import { SIGNUP_SCHEMA } from "../models/joi-schema/signupSchema";
import useHandleUser from "../hooks/useHandleUser";
import { Navigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const SignupPage = () => {
  const {
    handleSignup,
    value: { user },
  } = useHandleUser();

  const { value, ...rest } = useForm(
    INITIAL_SIGNUP_FORM,
    SIGNUP_SCHEMA,
    handleSignup
  );
  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleInputChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default SignupPage;
