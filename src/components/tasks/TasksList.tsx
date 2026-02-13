import styled from "styled-components";
import logo from "../../images/logo-sm.png";
import Button from "../Button";
import TaskItem from "./TaskItem";

const TaskContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "15px",
  padding: "20px",
  width: "90%",
  maxWidth: "450px",
  maxHeight: "450px",
  borderRadius: "10px",
  backgroundColor: "#fff",

  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const HeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",

  alignItems: "center",

  width: "100%",

  padding: "0px 10px",
});

const HeaderLabel = styled.div({
  fontSize: "18px",
  fontFamily: "arial",
});

const TaskScrollable = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  boxSizing: "border-box",

  height: "400px",
  maxHeight: "400px",
  width: "100%",

  padding: "10px 10px",

  gap: "15px",
  overflowY: "auto",
});

const ButtonWrapper = styled.div({
  marginLeft: "auto",
});

export interface Task {
  user_id: number;
  task_id: number;
  task: string;
}

interface TasksListProps {
  title: string;
  tasks?: Task[];
  onLogout: () => void;
  onTaskDelete: (task: { taskId: number }) => Promise<any>;
  onTaskUpdate: (task: { taskId: number; task: string }) => Promise<any>;
}

const StyledImg = styled.img({
  width: "50%",
  justifySelf: "center",
  alignSelf: "center",
});

const logoutStyles = {
  height: "40px",

  fontSize: "12px",

  color: "#4e4e4e",
  border: "solid 1px #9e9e9e",
  borderRadius: "20px",
  backgroundColor: "transparent",
};

const TasksList = ({
  title,
  tasks,
  onLogout,
  onTaskDelete,
  onTaskUpdate,
}: TasksListProps) => {
  return (
    <TaskContainer>
      <StyledImg src={logo} />
      <HeaderContainer>
        <HeaderLabel>{title}</HeaderLabel>
        <ButtonWrapper>
          <Button
            label="Log out"
            type="button"
            buttonStyles={logoutStyles}
            onClick={onLogout}
          />
        </ButtonWrapper>
      </HeaderContainer>
      <TaskScrollable>
        {tasks.map((t) => {
          return (
            <TaskItem
              key={t.task_id}
              taskId={t.task_id}
              task={t.task}
              onDelete={onTaskDelete}
              onUpdate={onTaskUpdate}
            />
          );
        })}
      </TaskScrollable>
    </TaskContainer>
  );
};

export default TasksList;
