import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import playground_db from "./models/database";

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

const connect = async () => {
  try {
    await playground_db.authenticate();
    console.log("Database connected successfully.");
    await playground_db.sync({ alter: true });
    console.log("Database synchronized (tables ensured).");
  } catch (error) {
    console.error("Unable to connect to or sync database:", error);
  }
};

connect();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
