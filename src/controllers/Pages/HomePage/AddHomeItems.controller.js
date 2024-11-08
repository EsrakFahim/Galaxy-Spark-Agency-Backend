import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { HomePage } from "../../../models/Pages/Homepage.model.js";

// Controller to create a new home page entry
const addHomeItems = asyncHandler(async (req, res) => {
      const {
            title,
            subTitle,
            videoText,
            videoUrl,
            bannerImageUrl,
            callToAction,
            isActive,
      } = req.body;

      // Ensure required fields are provided
      if (!title || !subTitle || !videoText || !videoUrl || !bannerImageUrl) {
            throw new apiErrorHandler(
                  400,
                  "Title, SubTitle, Video Text, Video URL, and Banner Image URL are required."
            );
      }

      try {
            // Check if a home page entry already exists (if you want to allow only one entry)
            const existingHomePage = await HomePage.findOne();
            if (existingHomePage) {
                  throw new apiErrorHandler(
                        400,
                        "A home page entry already exists. Please update the existing one."
                  );
            }

            // Create a new home page document
            const homePage = await HomePage.create({
                  title,
                  subTitle,
                  videoText,
                  videoUrl,
                  bannerImageUrl,
                  callToAction: {
                        text: callToAction?.text || "Get Started",
                        url: callToAction?.url || null,
                  },
                  isActive: isActive !== undefined ? isActive : true,
            });

            // Send success response
            return res
                  .status(201)
                  .json(
                        new apiResponse(
                              201,
                              homePage,
                              "Home page entry created successfully."
                        )
                  );
      } catch (error) {
            // Handle potential duplicate key or validation errors
            throw new apiErrorHandler(500, error.message);
      }
});

export { addHomeItems };
