import { UserStatus } from "./users";

export interface Restaurant {
  id: string;
  accountId: string;
  name: string;
  webId?: string;
  description?: string;
  cuisine: string;
  address?: Address;
  contact?: {
    phone?: string;
    email?: string;
  };
  operatingHours?: {
    weekends?: string;
    weekdays?: string;
  };
  status: UserStatus;
  priceRange: string;
  reservationInterval: number;
  capacity: number;
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
