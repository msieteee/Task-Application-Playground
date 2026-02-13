import { createContext, useState } from "react";
import { API_BASE } from "../common/enum";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      throw new Error("Failed to fetch task");
    }
  };

  const addTask = async (task: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: task }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      setTasks((prev) => [...prev, data.task]);

      return data.task;
    } catch (err) {
      throw new Error("Failed to add task");
    }
  };

  const updateTask = async (taskId: number, updatedTask: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: updatedTask }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const data = await res.json();

      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === taskId ? { ...task, task: data.task.task } : task,
        ),
      );

      return data.task;
    } catch (err) {
      throw new Error("Failed to update task");
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.task_id !== taskId));
    } catch (err) {
      throw new Error("Failed to delete task");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        fetchTasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
