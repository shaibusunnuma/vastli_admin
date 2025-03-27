import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { Review } from "@/types/review.types";
import { providesList } from "../../common";

export interface ReviewsResponse {
  data: Review[];
  metadata: {
    totalCount: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export const reviewApiSlice = createApi({
  reducerPath: "reviewApi",
  baseQuery: axiosBaseQuery({ baseUrl: "reviews" }),
  tagTypes: ["Reviews"],
  endpoints: (build) => ({
    getReviews: build.query<ReviewsResponse, { filter: object; query?: string }>({
      query: ({ filter, query }) => ({
        url: "",
        params: { filter, query },
      }),
      providesTags: (result, error) => providesList(result?.data, "Reviews"),
    }),

    getReviewById: build.query<Review, string>({
      query: (reviewId) => ({
        url: `/${reviewId}`,
      }),
      providesTags: (result, error, reviewId) => [{ type: "Reviews", id: reviewId }],
    }),

    addReview: build.mutation<Review, Partial<Review>>({
      query: (newReview) => ({
        url: "",
        method: "POST",
        data: newReview,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    updateReview: build.mutation<Review, Partial<Review>>({
      query: (updatedReview) => ({
        url: `/${updatedReview.id}`,
        method: "PATCH",
        data: updatedReview,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Reviews", id }],
    }),

    deleteReview: build.mutation<void, string>({
      query: (reviewId) => ({
        url: `/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, reviewId) => [{ type: "Reviews", id: reviewId }],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice; 