import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { TeamMember } from "../../models/TeamMember/TeamMember.model.js";

const getSingleTeamMember = asyncHandler(async (req, res) => {
      const { _id } = req.params;

      if (!_id) {
            throw new apiErrorHandler(res, 400, "Team member ID is required");
      }

      try {
            const teamMember = await TeamMember.findById(_id);

            if (!teamMember) {
                  throw new apiErrorHandler(res, 404, "Team member not found");
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              "Team member retrieved successfully",
                              teamMember
                        )
                  );
      } catch (error) {
            throw new apiErrorHandler(res, 500, error.message);
      }
});

export { getSingleTeamMember };
