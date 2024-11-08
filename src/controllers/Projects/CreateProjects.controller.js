import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { uploadFileCloudinary } from "../../FileHandler/Upload.js";
import { Projects } from "../../models/Projects/Projects.model.js";

// Controller for creating a new project
const CreateProject = asyncHandler(async (req, res, next) => {
      try {
            // Destructure fields from request body
            const {
                  name,
                  description,
                  client,
                  projectType,
                  status,
                  startDate,
                  endDate,
                  projectManager,
                  team,
                  budget,
                  spent,
                  tech,
                  notes,
                  livePreview,
                  sourceFile,
                  isActive,
            } = req.body;

            // Destructure files from request (if any)
            const { files } = req.files;

            // Validate required fields
            if (
                  !name ||
                  !description ||
                  !projectType ||
                  !status ||
                  !startDate ||
                  !projectManager ||
                  !team ||
                  !tech
            ) {
                  return apiErrorHandler(
                        res,
                        400,
                        "Please provide all required fields"
                  );
            }

            // Check if a project with the same name already exists
            const existingProject = await Projects.findOne({ name });
            if (existingProject) {
                  return apiErrorHandler(res, 400, "Project already exists");
            }

            // Process file uploads
            let uploadedFiles = [];
            if (files && files.length > 0) {
                  for (const file of files) {
                        const uploadedFile = await uploadFileCloudinary(
                              file[0].path
                        );
                        if (uploadedFile) {
                              uploadedFiles.push({
                                    url: uploadedFile.url,
                                    name: file.originalname,
                              });
                        }
                  }
            }

            // Create the new project
            const newProject = await Projects.create({
                  name,
                  description,
                  client: client || "",
                  projectType,
                  status,
                  startDate,
                  endDate: endDate || null,
                  projectManager,
                  team: Array.isArray(team) ? team : [team],
                  budget: budget || 0,
                  spent: spent || 0,
                  tech: Array.isArray(tech) ? tech : [tech],
                  files: uploadedFiles,
                  notes: notes || "",
                  livePreview: livePreview || null,
                  sourceFile: sourceFile || null,
                  isActive: isActive !== undefined ? isActive : true,
            });

            if (!newProject) {
                  return apiErrorHandler(res, 500, "Error creating project");
            }

            // Send a success response
            return res
                  .status(201)
                  .json(
                        new apiResponse(
                              201,
                              newProject,
                              "Project created successfully"
                        )
                  );
      } catch (error) {
            return apiErrorHandler(res, 500, error.message || "Server error");
      }
});

export { CreateProject };
