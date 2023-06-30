import { Container } from "@mui/material";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import FormLink from "../../forms/components/FormLink";
import { INITIAL_LOGIN_FORM } from "../helpers/initialforms/initialLoginforms";
import LOGIN_SCHEMA from "../models/joi-schema/loginSchema";
import { Navigate } from "react-router-dom";
import useHandleUser from "../hooks/useHandleUser";

const Login = () => {
  const {
    handleLogin,
    value: { user },
  } = useHandleUser();

  const { value, ...rest } = useForm(
    INITIAL_LOGIN_FORM,
    LOGIN_SCHEMA,
    handleLogin
  );

  const { handleInputChange, handleReset, onSubmit, validateForm } = rest;

  const { data, errors } = value;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "63vh",
        maxWidth: "350px",
      }}
    >
      <Form
        title="login"
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        styles={{
          backgroundColor: "",
          border: "solid 1px black",
          borderRadius: 3,
        }}
      >
        <Input
          type="email"
          label="email"
          name="email"
          data={data}
          error={errors.email}
          onInputChange={handleInputChange}
          // breakPoints={{ xs: 12, md: 6 }}
        />
        <Input
          type="password"
          label="password"
          name="password"
          data={data}
          error={errors.password}
          onInputChange={handleInputChange}
          // breakPoints={{ xs: 12, md: 6 }}
        />
        <FormLink
          text="Not registerd?"
          textButton="signup here"
          to={ROUTES.SIGNUP}
        />
      </Form>
    </Container>
  );
};

export default Login;
