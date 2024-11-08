import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS configuration
const corsOptions = {
      // origin: "https://www.galaxyspark.agency", // Allow your frontend origin
      origin: "*", // Allow all origins
      credentials: true, // Allow cookies to be sent
};

// Middleware setup
app.use(cors(corsOptions)); // Use the specified CORS options
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public")); // Serve static files from 'public' directory

// Routes import
import clientRouter from "./routes/client.routes.js";
import contactRoute from "./routes/contact.routes.js";
import serviceRoute from "./routes/service.routes.js";
import projectsRoute from "./routes/projects.routes.js";
import teamMemberRoute from "./routes/teamMember.routes.js";
import pricePlanRoute from "./routes/pricePlan.routes.js";
import agencyStatsRoute from "./routes/agencyStats.routes.js";
import homePageRoute from "./routes/homeItems.routes.js";

// Routes setup
app.use("/api/v1/client", clientRouter); // Mount client routes
app.use("/api/v1/contact", contactRoute); // Mount contact routes
app.use("/api/v1/service", serviceRoute); // Mount service routes
app.use("/api/v1/projects", projectsRoute); // Mount projects routes
app.use("/api/v1/team-member", teamMemberRoute); // Mount team member routes
app.use("/api/v1/price-plan", pricePlanRoute); // Mount price plan routes
app.use("/api/v1/agency-stats", agencyStatsRoute); // Mount agency stats routes
app.use("/api/v1/home-page", homePageRoute); // Mount home page routes

export { app };
