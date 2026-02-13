import styled from "styled-components";
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
  minHeight: "400px",
  maxHeight: "400px",
  borderRadius: "10px",
  backgroundColor: "#fff",

  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const HeaderLabel = styled.div({
  fontSize: "18px",
  fontFamily: "arial",
});

export interface Task {
  user_id: number;
  task_id: number;
  task: string;
}

interface TasksListProps {
  title: string;
  userId: number;
  tasks?: Task[];
}

const TasksList = ({ title, userId, tasks }: TasksListProps) => {
  return (
    <TaskContainer>
      <HeaderLabel>{title}</HeaderLabel>
      {tasks.map((t) => {
        return (
          <TaskItem
            key={t.task_id}
            userId={t.user_id}
            taskId={t.task_id}
            task={t.task}
          />
        );
      })}
    </TaskContainer>
  );
};

export default TasksList;
