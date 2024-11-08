// Controller to edit an existing home page entry
const editHomePage = asyncHandler(async (req, res) => {
      const {
            title,
            subTitle,
            videoText,
            videoUrl,
            bannerImageUrl,
            callToAction,
            isActive,
      } = req.body;

      try {
            // Find the existing home page entry
            const existingHomePage = await HomePage.findOne();
            if (!existingHomePage) {
                  throw new apiErrorHandler(404, "Home page entry not found.");
            }

            // Update only the provided fields, keeping the previous values for others
            existingHomePage.title = title || existingHomePage.title;
            existingHomePage.subTitle = subTitle || existingHomePage.subTitle;
            existingHomePage.videoText =
                  videoText || existingHomePage.videoText;
            existingHomePage.videoUrl = videoUrl || existingHomePage.videoUrl;
            existingHomePage.bannerImageUrl =
                  bannerImageUrl || existingHomePage.bannerImageUrl;

            // Update callToAction field conditionally
            if (callToAction) {
                  existingHomePage.callToAction.text =
                        callToAction.text || existingHomePage.callToAction.text;
                  existingHomePage.callToAction.url =
                        callToAction.url || existingHomePage.callToAction.url;
            }

            // Update isActive field if provided
            existingHomePage.isActive =
                  isActive !== undefined ? isActive : existingHomePage.isActive;

            // Save the updated home page entry
            const updatedHomePage = await existingHomePage.save();

            // Send success response
            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              updatedHomePage,
                              "Home page entry updated successfully."
                        )
                  );
      } catch (error) {
            // Handle any errors that occur during the process
            throw new apiErrorHandler(500, error.message);
      }
});

export { editHomePage };
