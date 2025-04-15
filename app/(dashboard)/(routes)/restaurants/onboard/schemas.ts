import * as z from "zod";


export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postalCode: z.string().optional(),
  googleMapsLink: z.string().optional(),
});

export type AddressType = z.infer<typeof AddressSchema>;

export const BasicInfoSchema = z.object({
  name: z.string().min(1, { message: "Restaurant name is required" }),
  type: z.string().optional(),
  description: z.string().optional(),
  webId: z.string().refine((val) => /^[a-zA-Z0-9-]+$/.test(val), {
    message: "webId must be a valid URL path segment, e.g., '/coco-eats'",
  }),
  address: AddressSchema,
});

export type BasicInfoType = z.infer<typeof BasicInfoSchema>;

export const ContactSchema = z.object({
  phone: z
    .string()
    .refine((val) => !val || /^0?\d{9,10}$/.test(val), {
      message: "Invalid phone number format",
    }),
  email: z
    .string()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
});

export type ContactType = z.infer<typeof ContactSchema>;
