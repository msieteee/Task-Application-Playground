import { useRef } from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import Button from "../Button";
import InputField from "../InputField";

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
});

const FieldWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const LogoWrapper = styled.div({
  width: "70%",
  maxWidth: "250px",
});

const StyledImg = styled.img({
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "100%",
  maxWidth: "100%",

  height: "40px",
});

interface LoginFormProps {
  onSubmit?: () => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <LogoWrapper>
        <StyledImg src={logo} alt="Logo" />
      </LogoWrapper>

      <StyledForm onSubmit={() => {}}>
        <FieldWrapper>
          <InputField
            inputRef={usernameRef}
            type="text"
            placeholder="Username"
            inputStyles={{}}
            maxLength={20}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputField
            inputRef={passwordRef}
            type="password"
            placeholder="Password"
            inputStyles={{}}
            maxLength={20}
          />
        </FieldWrapper>

        <StyledButton label="Log in" type="submit" />
      </StyledForm>
    </>
  );
};

export default LoginForm;
