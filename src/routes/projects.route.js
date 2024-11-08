import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { CreateProject } from "../controllers/Projects/Projects.controller.js";
// import { EditProject } from "../controllers/Projects/EditProject.controller.js";
// import { DeleteProject } from "../controllers/Projects/DeleteProject.controller.js";
// import { GetAllProjects } from "../controllers/Projects/GetAllProjects.controller.js";
// import { GetProjectById } from "../controllers/Projects/GetProjectById.controller.js";

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

// // Route for updating an existing project with file uploads
// router.route("/update/:id").put(
//       upload.fields([
//             {
//                   name: "files",
//                   maxCount: 10, // Adjust maxCount as needed
//             },
//       ]),
//       EditProject
// );

// // Route for deleting a project by ID
// router.route("/delete/:id").delete(DeleteProject);

// // Route for retrieving all projects
// router.route("/").get(GetAllProjects);

// // Route for retrieving a single project by ID
// router.route("/:id").get(GetProjectById);

export default router;
