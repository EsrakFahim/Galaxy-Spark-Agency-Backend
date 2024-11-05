import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Contact } from "../../models/Contact/contact.model.js";

const getContact = asyncHandler(async (req, res, next) => {
      try {
            const contact = await Contact.findOne();

            // Check if contact data exists
            if (!contact) {
                  return apiErrorHandler(res, 404, "Contact not found");
            }

            // Send successful response with contact data
            return apiResponse(res, 200, contact);
      } catch (error) {
            // Handle server error
            return apiErrorHandler(res, 500, "Server error");
      }
});

export { getContact };
