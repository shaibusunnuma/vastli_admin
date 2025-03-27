import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "~/types/users";

interface CustomerState {
  selectedCustomer: Customer | null;
  openHistoryView: boolean;
}

const initialState: CustomerState = {
  selectedCustomer: null,
  openHistoryView: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    setOpenHistoryView: (state, action: PayloadAction<boolean>) => {
      state.openHistoryView = action.payload;
    },
  },
  selectors: {
    selectOpenHistoryView: (state) => state.openHistoryView,
    selectCustomer: (state) => state.selectedCustomer,
  },
});

export const { setCustomer, setOpenHistoryView } = customerSlice.actions;
export const { selectCustomer, selectOpenHistoryView } = customerSlice.selectors;

export default customerSlice.reducer;
