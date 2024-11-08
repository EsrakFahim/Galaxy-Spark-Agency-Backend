import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";

const getSingleProject = asyncHandler(async (req, res, next) => {
      const { _id } = req.params; // Get project ID from request params

      try {
            const project = await Projects.findOne({ _id });

            if (!project) {
                  return apiErrorHandler(res, 404, "Project not found");
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              project,
                              "Project fetched successfully"
                        )
                  );
      } catch (error) {
            return apiErrorHandler(res, 500, error.message);
      }
});

export { getSingleProject };
