import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";

const getAllProjects = asyncHandler(async (req, res, next) => {
      try {
            const projects = await Projects.find();

            if (!projects) {
                  return apiErrorHandler(res, 404, "No projects found");
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
            return apiErrorHandler(res, 500, error.message);
      }
});

export { getAllProjects };
