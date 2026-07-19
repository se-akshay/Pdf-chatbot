import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import documentRoutes from "./src/routes/document.routes.js";
import queryRoutes from "./src/routes/query.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allows requests without an Origin header, such as Postman
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PDF chatbot backend is running.",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
  });
});

app.use("/api/document", documentRoutes);
app.use("/api/query", queryRoutes);

app.use((error, req, res, next) => {
  console.error("Unhandled request error:", error);

  if (error.name === "MulterError") {
    return res.status(400).json({
      message: "File upload failed.",
      error: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
