export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  reservationId: string;
  customerName: string;
  comment: string;
  date: Date;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
