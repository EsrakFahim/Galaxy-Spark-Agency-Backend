import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { TeamMember } from "../../models/TeamMember/TeamMember.model.js";

const removeTeamMember = asyncHandler(async (req, res) => {
      const { _id } = req.params;

      if (!_id) {
            return apiErrorHandler(res, 400, "Team member ID is required");
      }

      try {
            const existingTeamMember = await TeamMember.findById(_id);

            if (!existingTeamMember) {
                  return apiErrorHandler(
                        res,
                        404,
                        "Team member not found or already removed"
                  );
            }

            const deletedTeamMember = await TeamMember.findByIdAndDelete(_id);

            if (!deletedTeamMember) {
                  return apiErrorHandler(
                        res,
                        500,
                        "Failed to remove team member"
                  );
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              "Team member removed successfully",
                              deletedTeamMember
                        )
                  );
      } catch (error) {
            return apiErrorHandler(res, 500, error.message);
      }
});

export { removeTeamMember };
