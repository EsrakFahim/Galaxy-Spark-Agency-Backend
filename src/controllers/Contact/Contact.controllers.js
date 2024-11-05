import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Contact } from "../../models/Contact/contact.model.js";

const createContact = asyncHandler(async (req, res, next) => {
      const {
            email,
            phone,
            website,
            linkedin,
            twitter,
            facebook,
            instagram,
            pinterest,
            upwork,
            behance,
            github,
            fiverr,
            address,
      } = req.body;

      // Ensure either email or phone is provided
      if (!email && !phone) {
            return apiErrorHandler(res, 400, "Email or Phone is required.");
      }

      try {
            // Create the contact entry with trimmed fields
            const contact = new Contact({
                  email: email?.trim(),
                  phone: phone?.trim(),
                  website: website?.trim(),
                  linkedin: linkedin?.trim(),
                  twitter: twitter?.trim(),
                  facebook: facebook?.trim(),
                  instagram: instagram?.trim(),
                  pinterest: pinterest?.trim(),
                  upwork: upwork?.trim(),
                  behance: behance?.trim(),
                  github: github?.trim(),
                  fiverr: fiverr?.trim(),
                  address: address?.trim(),
            });

            // Save the contact to the database
            await contact.save();

            // Return successful response with contact data
            return apiResponse(res, 201, contact);
      } catch (error) {
            // Handle duplicate or other database errors
            if (error.code === 11000) {
                  return apiErrorHandler(
                        res,
                        409,
                        "Duplicate contact entry detected."
                  );
            }

            // Catch-all error handling
            return apiErrorHandler(res, 500, error.message);
      }
});

export { createContact };
