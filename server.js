import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
