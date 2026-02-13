import { useRef } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputField from "../InputField";

interface TaskAddProp {
  userId: number;
}

const TaskAddContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "15px",
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

const addButtonStyle = {
  backgroundColor: "#1EC5A9",
};

const TaskAdd = ({ userId }: TaskAddProp) => {
  const taskRef = useRef<HTMLInputElement>(null);

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskValue = taskRef.current?.value?.trim();
    if (!taskValue) return;

    console.log("Add task:", {
      userId,
      task: taskValue,
    });

    if (taskRef.current) {
      taskRef.current.value = "";
    }
  };

  return (
    <TaskAddContainer>
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
