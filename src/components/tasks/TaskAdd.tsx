import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputField from "../InputField";

interface TaskItem {
  taskValue: string;
}

interface TaskAddProp {
  onSubmit: (task: TaskItem) => Promise<any>;
}

const TaskAddContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  width: "90%",
  maxWidth: "450px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  margin: "0 auto",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const StyledForm = styled.form({
  display: "flex",
  width: "100%",
  gap: "20px",
});

const FieldWrapper = styled.div({
  flex: 1,
});

const ButtonWrapper = styled.div({
  display: "flex",
  gap: "15px",
});

const ErrorText = styled.div<{ hasError?: boolean }>(({ hasError }) => ({
  fontFamily: "Arial",
  fontSize: "12px",
  color: "#D55B5B",
  textAlign: "center",
  overflow: "hidden",

  height: hasError ? "16px" : "0px",
  maxHeight: hasError ? "16px" : "0px",

  marginBottom: hasError ? "10px" : "0px",
  transition: "all 0.2s ease-in-out, opacity 0.5s ease-in-out",
}));

const SuccessText = styled.div<{ hasSuccess?: boolean }>(({ hasSuccess }) => ({
  fontFamily: "Arial",
  fontSize: "12px",
  color: "#1EC5A9",
  textAlign: "center",
  overflow: "hidden",

  height: hasSuccess ? "16px" : "0px",
  maxHeight: hasSuccess ? "16px" : "0px",

  marginBottom: hasSuccess ? "10px" : "0px",
  transition: "all 0.2s ease-in-out, opacity 0.5s ease-in-out",
}));

const addButtonStyle = {
  backgroundColor: "#1EC5A9",
};

const TaskAdd = ({ onSubmit }: TaskAddProp) => {
  const taskRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const taskValue = taskRef.current?.value?.trim();
    if (!taskValue) return;

    try {
      await onSubmit({ taskValue: taskValue });

      if (taskRef.current) {
        taskRef.current.value = "";
      }

      setSuccessMessage("New Task was added successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add task");
    }
  };

  return (
    <TaskAddContainer>
      <ErrorText hasError={!!errorMessage}>{errorMessage}</ErrorText>
      <SuccessText hasSuccess={!!successMessage}>{successMessage}</SuccessText>
      <StyledForm onSubmit={handleTaskSubmit}>
        <FieldWrapper>
          <InputField inputRef={taskRef} type="text" placeholder="To do" />
        </FieldWrapper>
        <ButtonWrapper>
          <Button label="+" type="submit" buttonStyles={addButtonStyle} />
        </ButtonWrapper>
      </StyledForm>
    </TaskAddContainer>
  );
};

export default TaskAdd;
