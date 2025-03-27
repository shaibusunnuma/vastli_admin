import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "@/types/account.types";

interface AccountState {
  selectedAccount: Account | null;
}

const initialState: AccountState = {
  selectedAccount: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
  },
  selectors: {
    selectAccount: (state) => state.selectedAccount,
  },
});

export const { setAccount } = accountSlice.actions;
export const { selectAccount } = accountSlice.selectors;

export default accountSlice.reducer;
