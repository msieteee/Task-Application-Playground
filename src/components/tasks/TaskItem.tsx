import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import InputField from "../InputField";

interface TaskItemProps {
  task: string;
  taskId: number;
  userId: number;
}

const TaskItemContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "15px",
  padding: "10px 15px",
  width: "100%",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const TaskItemLabel = styled.span({
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
});

const ButtonWrapper = styled.div({
  display: "flex",
  gap: "10px",
});

const buttonBaseStyle = {
  margin: "0px",
  fontSize: "12px",
  padding: "10px",
};

const deleteButtonStyle = {
  ...buttonBaseStyle,
  padding: "10px 15px",
  backgroundColor: "#C51E3A",
};

const TaskItem = ({ task, taskId, userId }: TaskItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const taskRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    console.log("Delete task:", taskId);
  };

  const handleUpdate = async () => {
    const updatedValue = taskRef.current?.value?.trim();

    if (!updatedValue) return;

    console.log("Update task:", {
      taskId,
      userId,
      value: updatedValue,
    });

    setEditMode(false);
  };

  return (
    <TaskItemContainer>
      {!editMode ? (
        <TaskItemLabel>{task}</TaskItemLabel>
      ) : (
        <InputField
          inputRef={taskRef}
          type="text"
          defaultValue={task}
          placeholder={task}
          inputStyles={{
            fontSize: "14px",
          }}
        />
      )}

      <ButtonWrapper>
        {!editMode ? (
          <>
            <Button
              label="Edit"
              type="button"
              onClick={() => setEditMode(true)}
              buttonStyles={buttonBaseStyle}
            />
            <Button
              label="X"
              type="button"
              onClick={handleDelete}
              buttonStyles={deleteButtonStyle}
            />
          </>
        ) : (
          <Button
            label="Save"
            type="button"
            buttonStyles={buttonBaseStyle}
            onClick={handleUpdate}
          />
        )}
      </ButtonWrapper>
    </TaskItemContainer>
  );
};

export default TaskItem;
