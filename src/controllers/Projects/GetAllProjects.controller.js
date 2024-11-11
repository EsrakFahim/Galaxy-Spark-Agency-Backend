import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";

const getAllProjects = asyncHandler(async (req, res, next) => {
      try {
            const projects = await Projects.find();

            if (!projects) {
                  throw new apiErrorHandler(404, "No projects found");
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              projects,
                              "Projects fetched successfully"
                        )
                  );
      } catch (error) {
            throw new apiErrorHandler(res, 500, error.message);
      }
});

// Controller to get the list of project types
const getProjectTypes = asyncHandler(async (req, res, next) => {
      try {
            // Extracting the enum values for projectType from the schema
            const projectTypes = Projects.schema.path("projectType").enumValues;

            // Return the project types array as a JSON response
            res.status(200).json({
                  success: true,
                  data: projectTypes,
            });
      } catch (error) {
            next(new apiErrorHandler(500, error.message));
      }
});

export { getAllProjects, getProjectTypes };
