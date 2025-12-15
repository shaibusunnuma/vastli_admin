import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { restaurantApiSlice } from "@/lib/services/restaurants/restaurantApiSlice";
import { restaurantSlice } from "@/lib/features/restaurants/restaurantSlice";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { reservationApiSlice } from "./services/reservations/reservationApiSlice";
import { customerApiSlice } from "./services/customers/customerApiSlice";
import { reservationSlice } from "./features/reservations/reservationSlice";
import { accountApiSlice } from "./services/account/accountApiSlice";
import { accountSlice } from "./features/account/accountSlice";
import { serverApiSlice } from "./services/servers/serverApiSlice";
import { customerSlice } from "./features/customer/customerSlice";
import { userApiSlice } from "./services/users/userApiSlice";
import { reviewApiSlice } from "./services/reviews/reviewApiSlice";
import { analyticsApiSlice } from "./services/analytics/analyticsApiSlice";
import { settingsAdminApiSlice } from "./services/settings/adminApiSlice";

const rootReducer = combineSlices(
  analyticsApiSlice,
  reservationApiSlice,
  restaurantApiSlice,
  restaurantSlice,
  reservationSlice,
  accountApiSlice,
  accountSlice,
  serverApiSlice,
  customerSlice,
  userApiSlice,
  customerApiSlice,
  reviewApiSlice,
  settingsAdminApiSlice
);
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(restaurantApiSlice.middleware)
        .concat(reservationApiSlice.middleware)
        .concat(customerApiSlice.middleware)
        .concat(serverApiSlice.middleware)
        .concat(accountApiSlice.middleware)
        .concat(userApiSlice.middleware)
        .concat(analyticsApiSlice.middleware)
        .concat(reviewApiSlice.middleware)
        .concat(settingsAdminApiSlice.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
