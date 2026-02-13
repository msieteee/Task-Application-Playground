import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_BASE } from "../common/enum";
import Button from "../components/Button";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";
import { AuthContext } from "../context/AuthContext";

const LoginParentContainer = styled.div({
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

  background: "#cecece",
});

const buttonStyles = {
  width: "60%",
  maxWidth: "60%",
  height: "40px",

  fontSize: "12px",

  color: "#4e4e4e",
  border: "solid 1px #9e9e9e",
  borderRadius: "20px",
  backgroundColor: "transparent",
};

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const loginHandler = async ({ username, password }) => {
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      loginUser(data.user, data.token);

      navigate("/tasks");
    } catch (err) {
      throw new Error(err.message || "Login request failed");
    }
  };

  const registerHandler = async ({ name, email, username, password }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Sign Up failed");
      }
    } catch (err) {
      throw new Error(err.message || "Sign Up request failed");
    }
  };

  const Form = loginForm ? (
    <LoginForm onSubmit={loginHandler} />
  ) : (
    <SignUpForm onSubmit={registerHandler} />
  );

  const FormButton = (
    <Button
      label={loginForm ? "Create new account" : "Sign in to your account"}
      onClick={() => {
        setLoginForm(!loginForm);
      }}
      buttonStyles={buttonStyles}
    />
  );

  return (
    <LoginParentContainer>
      <LoginPageContainer>
        {Form}
        <Divider />
        {FormButton}
      </LoginPageContainer>
    </LoginParentContainer>
  );
};

export default LoginPage;
