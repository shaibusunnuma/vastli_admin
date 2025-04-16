import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/types/restaurants";
import { CustomerStats } from "@/types/users";
import { ReservationStats } from "@/types/reservations";

interface RestaurantStats {
  customerStats?: CustomerStats;
  reservationStats?: ReservationStats;
}

interface RestaurantState {
  restaurants: Restaurant[];
  activeRestaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
  stats: RestaurantStats | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  activeRestaurant: null,
  isLoading: false,
  error: null,
  stats: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.activeRestaurant = action.payload;
    },
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      const { payload } = action;
      state.restaurants = payload;
      if (payload.length && !state.activeRestaurant) {
        state.activeRestaurant = payload[0];
      }
    },
    setRestaurantStats: (state, action: PayloadAction<RestaurantStats>) => {
      state.stats = action.payload;
    },
  },
  selectors: {
    selectRestaurants: (res) => res.restaurants,
    selectRestaurant: (res) => res.activeRestaurant,
    selectIsLoading: (res) => res.isLoading,
    selectError: (res) => res.error,
    selectRestaurantStats: (res) => res.stats,
  },
});

export const { setRestaurant, setRestaurants, setRestaurantStats } = restaurantSlice.actions;
export const { selectRestaurant, selectRestaurants, selectIsLoading, selectError, selectRestaurantStats } = restaurantSlice.selectors;

export default restaurantSlice.reducer;
