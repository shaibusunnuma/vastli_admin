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

export type AddressType = z.infer<typeof AddressSchema>;

export const BasicInfoSchema = z.object({
  name: z.string().min(1, { message: "Restaurant name is required" }),
  cuisine: z.string().optional(),
  description: z.string().optional(),
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

