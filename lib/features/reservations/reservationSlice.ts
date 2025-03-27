import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PERIOD, Reservation } from "@/types/reservations";

interface ReservationState {
  selectedReservation: Reservation | null;
  openResEditView: boolean;
  period: PERIOD;
  date: string;
}

const initialState: ReservationState = {
  selectedReservation: null,
  openResEditView: false,
  period: PERIOD.DAY,
  date: new Date().toISOString(),
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.selectedReservation = action.payload;
    },
    setOpenResEditView: (state, action: PayloadAction<boolean>) => {
      state.openResEditView = action.payload;
    },
    setPeriod: (state, action: PayloadAction<PERIOD>) => {
      state.period = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
  selectors: {
    selectReservation: (state) => state.selectedReservation,
    selectOpenResEditView: (state) => state.openResEditView,
    selectPeriod: (state) => state.period,
    selectDate: (state) => state.date,
  },
});

export const { setReservation, setOpenResEditView, setPeriod, setDate } = reservationSlice.actions;
export const { selectReservation, selectOpenResEditView, selectPeriod, selectDate } =
  reservationSlice.selectors;

export default reservationSlice.reducer;
