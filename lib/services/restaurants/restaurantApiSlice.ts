import { createApi } from "@reduxjs/toolkit/query/react";
import { Restaurant, Review } from "@/types/restaurants";
import { axiosBaseQuery } from "~/lib/baseQuery";
import { providesList } from "../../common";

export const restaurantApiSlice = createApi({
  reducerPath: "restaurantApi",
  baseQuery: axiosBaseQuery({ baseUrl: "restaurants" }),
  tagTypes: ["Restaurants", "Reviews"],
  endpoints: (build) => ({
    getRestaurants: build.query<Restaurant[], Partial<Restaurant>>({
      query: (filter) => ({ url: "", params: filter }),
      providesTags: (result, error, { accountId }) =>
        providesList(result, "Restaurants", accountId),
    }),

    getRestaurantById: build.query<Restaurant, string>({
      query: (restaurantId) => ({ url: `/${restaurantId}` }),
      providesTags: (result, error, restaurantId) => [{ type: "Restaurants", id: restaurantId }],
    }),

    addRestaurant: build.mutation<Restaurant, Partial<Restaurant>>({
      query: (newRestaurant) => ({
        url: "",
        method: "POST",
        data: newRestaurant,
      }),
      invalidatesTags: [{ type: "Restaurants", id: "LIST" }],
    }),

    updateRestaurant: build.mutation<Restaurant, Partial<Restaurant>>({
      query: (updatedRestaurant) => ({
        url: `/${updatedRestaurant.id}`,
        method: "PATCH",
        data: updatedRestaurant,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Restaurants", id }],
    }),

    deleteRestaurant: build.mutation<void, string>({
      query: (restaurantId) => ({
        url: `/${restaurantId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, restaurantId) => [{ type: "Restaurants", id: restaurantId }],
    }),
    getReviews: build.query<Review[], Partial<Review>>({
      query: ({ restaurantId, ...filter }) => ({ url: `/${restaurantId}/reviews`, params: filter }),
      providesTags: (result, error, { id }) => providesList(result, "Reviews", id),
    }),

    addReview: build.mutation<Review, Partial<Review>>({
      query: ({ restaurantId, ...review }) => ({
        url: `/${restaurantId}/reviews`,
        method: "POST",
        data: review,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useAddRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApiSlice;
