import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS configuration
const corsOptions = {
      origin: "https://www.galaxyspark.agency", // Allow your frontend origin
      credentials: true, // Allow cookies to be sent
};

// Middleware setup
app.use(cors(corsOptions)); // Use the specified CORS options
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public")); // Serve static files from 'public' directory

// Routes import
import clientRouter from "./routes/client.route.js";
import contactRoute from "./routes/contact.route.js";
import serviceRoute from "./routes/service.route.js";
import projectsRoute from "./routes/projects.route.js";

// Routes setup
app.use("/api/v1/client", clientRouter); // Mount client routes
app.use("/api/v1/contact", contactRoute); // Mount contact routes
app.use("/api/v1/service", serviceRoute); // Mount service routes
app.use("/api/v1/projects", projectsRoute); // Mount projects routes

export { app };
