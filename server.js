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

const PRODUCTION_LINK = "";

const corsOptions =
  process.env.NODE_ENV === "production"
    ? {
        origin: PRODUCTION_LINK,
        methods: ["POST", "GET", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "X-Requested-With"],
      }
    : {
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
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      "PLAYGROUND_SECRET_KEY",
      { expiresIn: "12h" },
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
