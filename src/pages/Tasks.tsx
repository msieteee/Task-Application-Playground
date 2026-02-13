import styled from "styled-components";
import TaskAdd from "../components/tasks/TaskAdd";
import TasksList, { Task } from "../components/tasks/TasksList";

const TaskPageParentContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  backgroundColor: "#7499B7",

  alignItems: "center",
  justifyContent: "center",
});

const TaskContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  width: "90%",
  maxWidth: "1080px",
});

const TaskPage = () => {
  const tempoTasks: Task[] = [
    {
      user_id: 12345,
      task_id: 1,
      task: "hehe",
    },
    {
      user_id: 12345,
      task_id: 1,
      task: "hehe",
    },
    {
      user_id: 12345,
      task_id: 1,
      task: "hehe",
    },
    {
      user_id: 12345,
      task_id: 1,
      task: "hehe",
    },
  ];

  return (
    <TaskPageParentContainer>
      <TaskContainer>
        <TasksList title={`Miguel's Tasks`} userId={12345} tasks={tempoTasks} />
      </TaskContainer>
      <TaskAdd userId={12345} />
    </TaskPageParentContainer>
  );
};

export default TaskPage;
