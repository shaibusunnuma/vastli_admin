import { Restaurant } from "@/types/restaurants";
import { UserStatus } from "@/types/users";
import * as z from "zod";

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postalCode: z.string().optional(),
  googleMapsLink: z.string().optional(),
});

export const ContactSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  // .refine((val) => !val || /^0?\d{9,10}$/.test(val), {
  //   message: "Invalid phone number format",
  // }),
  email: z.string().refine((val) => !val || z.string().email().safeParse(val).success, {
    message: "Invalid email address",
  }),
});
export const OwnerInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  phone: z.string().min(1, "Phone is required")
  // .refine((val) => !val || /^0?\d{9,10}$/.test(val), {
  //   message: "Invalid phone number format",
  // }),
});

export type AddressType = z.infer<typeof AddressSchema>;

export const BasicInfoSchema = z.object({
  name: z.string().min(1, { message: "Restaurant name is required" }),
  webId: z
    .string()
    .optional()
    .refine((val: string | undefined) => (val ? /^[a-zA-Z0-9-]+$/.test(val) : true), {
      message: "webId must be a valid URL path segment, e.g., '/coco-eats'",
    }),
  cuisine: z.string().min(1, { message: "Cuisine is required" }),
  description: z.string().optional(),
  address: AddressSchema,
  contact: ContactSchema,
});

export type BasicInfoType = z.infer<typeof BasicInfoSchema>;

export type OwnerInfoType = z.infer<typeof OwnerInfoSchema>;
export type ContactInfoType = z.infer<typeof ContactSchema>;

const timeRangeRegex = /^([01]?\d|2[0-3]):([0-5]?\d)-([01]?\d|2[0-3]):([0-5]?\d)$/;

const validateTimeRange = (val: string | undefined): boolean => !val || timeRangeRegex.test(val);

const validateIndividualDay = (val: string | undefined): boolean => !val || val === "" || timeRangeRegex.test(val);

const operatingHoursBaseSchema = z.object({
  weekdays: z.string().refine(validateTimeRange, {
    message: "Invalid time format. Use HH:MM-HH:MM",
  }),
  weekends: z.string().refine(validateTimeRange, {
    message: "Invalid time format. Use HH:MM-HH:MM",
  }),
  monday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  tuesday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  wednesday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  thursday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  friday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  saturday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  sunday: z.string().optional().refine(validateIndividualDay, {
    message: "Invalid time format. Use HH:MM-HH:MM or leave empty if closed",
  }),
  useIndividualDaySettings: z.boolean().default(false),
});

export const OperatingHoursSchema = operatingHoursBaseSchema
  .refine(
    (data) => {
      // If not using individual days, weekdays must be valid and not empty
      if (!data.useIndividualDaySettings) {
        return data.weekdays && data.weekdays.trim() !== "" && timeRangeRegex.test(data.weekdays);
      }
      // No additional validation for weekdays when using individual days
      return true;
    },
    {
      message: "Weekdays hours are required when not using individual day settings",
      path: ["weekdays"],
    }
  )
  .refine(
    (data) => {
      // If weekends has a value and we're not using individual days, it must be in the correct format
      if (!data.useIndividualDaySettings && data.weekends && data.weekends.trim() !== "") {
        return timeRangeRegex.test(data.weekends);
      }
      // No additional validation needed otherwise
      return true;
    },
    {
      message: "Invalid time format for weekends. Use HH:MM-HH:MM format",
      path: ["weekends"],
    }
  );

export type OperatingHoursType = z.infer<typeof OperatingHoursSchema>;

export const RestaurantSettingsSchema = z.object({
  allowSelfBookingManagement: z.boolean(),
  timeSlotInterval: z.number().int().min(15).max(120).default(30),
  maxBookingDaysInAdvance: z.number().int().min(1).max(90).default(30),
  minGuestsPerReservation: z.number().int().min(1).max(20).default(1),
  maxGuestsPerReservation: z.number().int().min(1).max(50).default(20),
  autoConfirmReservations: z.boolean().default(false),
});

export const SettingsAndHoursSchema = z.object({
  reservationSettings: RestaurantSettingsSchema,
  operatingHours: OperatingHoursSchema,
});

export type SettingsAndHoursType = z.infer<typeof SettingsAndHoursSchema>;


export type RestaurantSettingsType = z.infer<typeof RestaurantSettingsSchema>;

export const defaultRestaurant: Omit<Restaurant, "id" | "accountId" | "createdAt" | "updatedAt"> = {
  name: "",
  cuisine: "",
  status: UserStatus.PENDING,
  webId: "",
  imageUrl: "",
  logoUrl: "",
  description: "",
  reservationSettings: {
    allowSelfBookingManagement: true,
    timeSlotInterval: 30,
    maxBookingDaysInAdvance: 90,
    minGuestsPerReservation: 1,
    maxGuestsPerReservation: 10,
    autoConfirmReservations: true,
  },
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    googleMapsLink: "",
  },
  contact: {
    phone: "",
    email: "",
  },
  operatingHours: {
    weekends: "",
    weekdays: "",
    useIndividualDaySettings: false,
  },
  priceRange: "$$",
  capacity: "",
  ownerId: "",
};
