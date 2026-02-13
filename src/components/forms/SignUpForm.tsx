import { useRef, useState } from "react";
import styled from "styled-components";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from "../../common/errorCheck";
import logo from "../../images/logo.png";
import Button from "../Button";
import InputField from "../InputField";

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
});

const LogoWrapper = styled.div({
  width: "70%",
  maxWidth: "140px",
});

const Divider = styled.div({
  width: "100%",
  height: "1px",
  backgroundColor: "#EBEBEB",
  margin: "10px 0",
});

const StyledImg = styled.img({
  width: "100%",
});

const LabelWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  fontFamily: "Arial",
});

const HeaderLabel = styled.div({ fontSize: "24px" });
const SubHeaderLabel = styled.div({
  fontSize: "16px",
  color: "#5a5a5a",
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

const SuccessText = styled.div<{ hasSuccess?: boolean }>(({ hasSuccess }) => ({
  fontFamily: "Arial",
  fontSize: "12px",
  color: "#1EC5A9",
  textAlign: "center",
  overflow: "hidden",

  maxHeight: hasSuccess ? "16px" : "0px",
  transition: "max-height 0.2s ease-in-out, opacity 0.5s ease-in-out",
}));

interface SignUpFormProps {
  onSubmit: (formData: FormDataType) => Promise<any>;
}

interface FormDataType {
  name: string;
  email: string;
  username: string;
  password: string;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, boolean> = {};

    let message = "";
    const nameMsg = nameValidation(nameRef.current?.value || "");
    if (nameMsg) {
      newErrors.name = true;
      message = nameMsg;
    } else {
      const emailMsg = emailValidation(emailRef.current?.value || "");
      if (emailMsg) {
        newErrors.email = true;
        message = emailMsg;
      } else {
        const usernameMsg = usernameValidation(
          usernameRef.current?.value || "",
        );
        if (usernameMsg) {
          newErrors.username = true;
          message = usernameMsg;
        } else {
          const passwordMsg = passwordValidation(
            passwordRef.current?.value || "",
          );
          if (passwordMsg) {
            newErrors.password = true;
            message = passwordMsg;
          }
        }
      }
    }

    setErrors(newErrors);
    setErrorMessage(message);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    const formData: FormDataType = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      await onSubmit(formData);

      nameRef.current!.value = "";
      emailRef.current!.value = "";
      usernameRef.current!.value = "";
      passwordRef.current!.value = "";

      setSuccessMessage("Account Created!");
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <>
      <LogoWrapper>
        <StyledImg src={logo} alt="Logo" />
      </LogoWrapper>

      <LabelWrapper>
        <HeaderLabel>Create a New Account</HeaderLabel>
        <SubHeaderLabel>It's quick and easy!</SubHeaderLabel>
      </LabelWrapper>

      <StyledForm onSubmit={handleSubmit}>
        <InputField
          inputRef={nameRef}
          type="text"
          placeholder="Full Name"
          maxLength={30}
          isError={errors.name}
        />

        <InputField
          inputRef={emailRef}
          type="text"
          placeholder="Email Address"
          maxLength={50}
          isError={errors.email}
        />

        <Divider />

        <InputField
          inputRef={usernameRef}
          type="text"
          placeholder="Username"
          maxLength={20}
          isError={errors.username}
        />

        <InputField
          inputRef={passwordRef}
          type="password"
          placeholder="New Password"
          maxLength={20}
          isError={errors.password}
        />

        <ErrorText hasError={!!errorMessage}>{errorMessage}</ErrorText>
        <SuccessText hasSuccess={!!successMessage}>
          {successMessage}
        </SuccessText>

        <Button
          label="Create Account"
          type="submit"
          buttonStyles={{
            width: "100%",
            height: "40px",
            backgroundColor: "#4CAF50",
          }}
        />
      </StyledForm>
    </>
  );
};

export default SignUpForm;
