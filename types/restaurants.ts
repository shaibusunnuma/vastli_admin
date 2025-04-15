import { UserStatus } from "./users";

export interface Restaurant {
  id: string;
  accountId: string;
  name: string;
  cuisine: string;
  status: UserStatus
  webId?: string;
  imageUrl?: string;
  logoUrl?: string;
  description?: string;
  reservationSettings: {
    allowSelfBookingManagement: boolean;
    timeSlotInterval: number;
    maxBookingDaysInAdvance: number;
    minGuestsPerReservation: number;
    maxGuestsPerReservation: number;
    autoConfirmReservations: boolean;
  };
  address: Address;
  contact: {
    phone: string;
    email?: string;
  };
  operatingHours: {
    weekends: string;
    weekdays: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    useIndividualDaySettings: boolean;
  };
  priceRange: string;
  capacity: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  googleMapsLink?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  reservationId: string;
  customerName: string;
  userId: string;
  comment: string;
  rating: number;
  date: string;
}

export type Step = "1" | "2" | "3" | "4";
