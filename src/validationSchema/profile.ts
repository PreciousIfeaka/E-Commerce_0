import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "name is required").optional(),
  phone: z.string().min(1, "phone number is required").optional(),
  street_address: z.string().min(1, "street_address is required").optional(),
  city: z.string().min(1, "city is required").optional(),
  state: z.string().min(1, "state is required").optional(),
  country: z.string().min(1, "country is required").optional(),
  zip_code: z
    .string()
    .min(5, "zip_code must be a minimum of 5 characters")
    .optional(),
  gender: z.string().min(1, "gender is required").optional(),
});
