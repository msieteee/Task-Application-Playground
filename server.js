import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import playground_db from "./models/database.js";
import Task from "./models/task.js";
import User from "./models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Keep cors for webpack liveserver testing
const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      "PLAYGROUND_SECRET_KEY",
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      username,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, "PLAYGROUND_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

app.get("/api/tasks", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.userId;
    const tasks = await Task.findAll({ where: { user_id } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching user's tasks:", error);
    res.status(500).json({ error: "Failed to fetch user tasks" });
  }
});

app.post("/api/task", verifyToken, async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) return res.status(400).json({ error: "Task is required" });

    const user_id = req.user.userId;
    const newTask = await Task.create({ user_id, task });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.delete("/api/task/:task_id", verifyToken, async (req, res) => {
  try {
    const { task_id } = req.params;
    const user_id = req.user.userId;

    const deleted = await Task.destroy({
      where: {
        task_id,
        user_id,
      },
    });

    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.put("/api/task/:task_id", verifyToken, async (req, res) => {
  try {
    const { task } = req.body;
    const { task_id } = req.params;
    const user_id = req.user.userId;

    const taskToUpdate = await Task.findOne({
      where: {
        task_id,
        user_id,
      },
    });

    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });

    taskToUpdate.task = task || taskToUpdate.task;
    await taskToUpdate.save();
    res
      .status(200)
      .json({ message: "Task updated successfully", task: taskToUpdate });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

const connect = async () => {
  void User;
  void Task;

  try {
    await playground_db.authenticate();
    console.log("Database connected successfully.");
    await playground_db.sync({ alter: true });
    console.log("Database  synchronized (tables ensured).");
  } catch (error) {
    console.error("Unable to connect to or sync database:", error);
  }
};

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
