import styled from "styled-components";
import Button from "../components/Button";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = styled.div({
  display: "flex",
  height: "100%",
  width: "100%",
  backgroundColor: "#7499B7",

  alignItems: "center",
  justifyContent: "center",
});

const LoginPageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  gap: "15px",
  padding: "20px",
  width: "90%",
  maxWidth: "350px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  margin: "0 auto",

  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const Divider = styled.div({
  height: "1px",
  width: "80%",
  borderRadius: "5px",

  background: "#9e9e9e",
});

const Login = () => {
  const loginHandler = () => {};

  const Form = <LoginForm onSubmit={loginHandler} />;
  const FormButton = (
    <Button
      label="Create new account"
      onClick={() => {}}
      buttonStyles={{
        width: "60%",
        maxWidth: "60%",
        height: "40px",

        fontSize: "12px",

        backgroundColor: "none",
      }}
    />
  );

  return (
    <LoginPage>
      <LoginPageContainer>
        {Form}
        <Divider />
        {FormButton}
      </LoginPageContainer>
    </LoginPage>
  );
};

export default Login;
