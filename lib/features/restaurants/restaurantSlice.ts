import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/types/restaurants";

interface RestaurantState {
  restaurants: Restaurant[];
  activeRestaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  activeRestaurant: null,
  isLoading: false,
  error: null,
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
  },
  selectors: {
    selectRestaurants: (res) => res.restaurants,
    selectRestaurant: (res) => res.activeRestaurant,
    selectIsLoading: (res) => res.isLoading,
    selectError: (res) => res.error,
  },
});

export const { setRestaurant, setRestaurants } = restaurantSlice.actions;
export const { selectRestaurant, selectRestaurants, selectIsLoading, selectError } =
  restaurantSlice.selectors;

export default restaurantSlice.reducer;
