import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TaskAdd from "../components/tasks/TaskAdd";
import TasksList from "../components/tasks/TasksList";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

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
  const navigate = useNavigate();
  const { getUser, logoutUser } = useContext(AuthContext);
  const { tasks, addTask, fetchTasks, deleteTask, updateTask } =
    useContext(TaskContext);

  const handleAddTask = async ({ taskValue }) => {
    await addTask(taskValue);
  };

  const handleDeleteTask = async ({ taskId }) => {
    await deleteTask(taskId);
  };

  const handleUpdateTask = async ({ taskId, task }) => {
    await updateTask(taskId, task);
  };

  const handleLogoutUser = async () => {
    logoutUser();
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const { user } = getUser();

  const formatPossessiveName = (name: string) => {
    if (!name) return "";

    const titleCased = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (titleCased.endsWith("s")) {
      return `${titleCased}'`;
    }

    return `${titleCased}'s`;
  };

  return (
    <TaskPageParentContainer>
      <TaskContainer>
        <TasksList
          title={`${formatPossessiveName(user.name)} Tasks!`}
          tasks={tasks}
          onLogout={handleLogoutUser}
          onTaskDelete={handleDeleteTask}
          onTaskUpdate={handleUpdateTask}
        />
      </TaskContainer>
      <TaskAdd onSubmit={handleAddTask} />
    </TaskPageParentContainer>
  );
};

export default TaskPage;
