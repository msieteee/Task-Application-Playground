import { useRef, useState } from "react";
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

const ErrorText = styled.div<{ hasError?: boolean }>(({ hasError }) => ({
  fontFamily: "Arial",
  fontSize: "12px",
  color: "#D55B5B",
  textAlign: "center",
  overflow: "hidden",

  maxHeight: hasError ? "16px" : "0px",
  transition: "max-height 0.2s ease-in-out, opacity 0.5s ease-in-out",
}));

interface LoginDataType {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formData: LoginDataType) => Promise<any>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, boolean> = {};

    if (
      !usernameRef.current?.value.trim() ||
      !passwordRef.current?.value.trim()
    )
      newErrors.username = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData: LoginDataType = {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      // Clear inputs

      await onSubmit(formData);

      usernameRef.current!.value = "";
      passwordRef.current!.value = "";
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <>
      <LogoWrapper>
        <StyledImg src={logo} alt="Logo" />
      </LogoWrapper>

      <StyledForm onSubmit={handleSubmit}>
        <FieldWrapper>
          <InputField
            inputRef={usernameRef}
            type="text"
            placeholder="Username"
            inputStyles={{}}
            maxLength={20}
            isError={errors.username}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputField
            inputRef={passwordRef}
            type="password"
            placeholder="Password"
            inputStyles={{}}
            maxLength={20}
            isError={errors.username}
          />
        </FieldWrapper>

        <ErrorText hasError={!!errorMessage}>{errorMessage}</ErrorText>

        <StyledButton label="Log in" type="submit" />
      </StyledForm>
    </>
  );
};

export default LoginForm;
