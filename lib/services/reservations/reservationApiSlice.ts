import { createApi } from "@reduxjs/toolkit/query/react";
import { BookingsResponse, PERIOD, Reservation } from "@/types/reservations";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { providesList } from "../../common";

interface TableIdAndDate {
  tableId: string;
  bookingDateTime: string;
}

interface Filter {
  restaurantId: string;
  page: number;
  period: PERIOD;
  date: string;
}

export const reservationApiSlice = createApi({
  reducerPath: "reservationApi",
  baseQuery: axiosBaseQuery({ baseUrl: "bookings" }),
  tagTypes: ["Reservations"],
  endpoints: (build) => ({
    getReservations: build.query<BookingsResponse, Filter>({
      query: (filter) => ({
        params: filter,
      }),
      providesTags: (result, error, { restaurantId, period, date }) =>
        providesList(result?.data, "Reservations", `${restaurantId}-${period}-${date}`),
    }),

    getReservationByFilter: build.query<Reservation[], Partial<Reservation>>({
      query: (filter) => ({
        url: "/filter",
        params: filter,
      }),
      providesTags: (result, error, filter) => providesList(result, "Reservations", JSON.stringify(filter)),
    }),
    getReservationById: build.query<Reservation, string>({
      query: (reservationId) => ({
        url: `/${reservationId}`,
      }),
      providesTags: (result, error, reservationId) => [{ type: "Reservations", id: reservationId }],
    }),
    addReservation: build.mutation<Reservation, Partial<Reservation>>({
      query: (newReservation) => ({
        url: "",
        method: "POST",
        data: newReservation,
      }),
      invalidatesTags: [{ type: "Reservations", id: "LIST" }],
    }),

    updateReservation: build.mutation<Reservation, Partial<Reservation>>({
      query: (updatedReservation) => ({
        url: `/${updatedReservation.id}`,
        method: "PATCH",
        data: updatedReservation,
      }),
      async onQueryStarted(updatedReservation, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          reservationApiSlice.util.updateQueryData("getReservationById", updatedReservation.id!, (draft) => {
            Object.assign(draft, updatedReservation);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Reservations", id }, { type: "Reservations", id: "LIST" }],
    }),

    assignTable: build.mutation<Reservation, { reservationId: string; table: TableIdAndDate }>({
      query: ({ reservationId, table }) => ({
        url: `/${reservationId}`,
        method: "PUT",
        data: table,
      }),
      invalidatesTags: (result, error, { reservationId }) => [
        { type: "Reservations", id: reservationId },
        { type: "Reservations", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useGetReservationByIdQuery,
  useGetReservationByFilterQuery,
  useAddReservationMutation,
  useUpdateReservationMutation,
  useAssignTableMutation,
} = reservationApiSlice;
