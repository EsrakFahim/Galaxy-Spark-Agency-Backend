import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { TeamMember } from "../../models/TeamMember/TeamMember.model.js";

const getAllTeamMember = asyncHandler(async (req, res) => {
      try {
            const teamMembers = await TeamMember.find();

            if (!teamMembers) {
                  return apiErrorHandler(res, 404, "No team members found");
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              "Team members retrieved successfully",
                              teamMembers
                        )
                  );
      } catch (error) {
            return apiErrorHandler(res, 500, error.message);
      }
});

export { getAllTeamMember  };
