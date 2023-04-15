import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import pageIndexReducer from "./features/pageIndex";

import { Action } from "redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pageIndex: pageIndexReducer,
    },
  });
};
const store = makeStore();
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
