import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { CreateProject } from "../controllers/Projects/CreateProjects.controller.js";
import { EditProject } from "../controllers/Projects/EditProjects.controller.js";
import { deleteProjects } from "../controllers/Projects/DeleteProjects.controller.js";
import { getAllProjects } from "../controllers/Projects/GetAllProjects.controller.js";
import { getSingleProject } from "../controllers/Projects/GetSingleProjects.controller.js";

const router = Router();

// Route for creating a new project with file uploads
router.route("/upload").post(
      upload.fields([
            {
                  name: "files",
                  maxCount: 10, // Adjust maxCount as needed
            },
      ]),
      CreateProject
);

// Route for updating an existing project with file uploads
router.route("/update/:id").put(
      upload.fields([
            {
                  name: "files",
                  maxCount: 10, // Adjust maxCount as needed
            },
      ]),
      EditProject
);

// Route for deleting a project by ID
router.route("/delete/:id").delete(deleteProjects);

// Route for retrieving all projects
router.route("/").get(getAllProjects);

// Route for retrieving a single project by ID
router.route("/:id").get(getSingleProject);

export default router;
