import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import pageIndexReducer from "./features/pageIndex";
import commentModifyReducer from "./features/commentModify";

import { Action } from "redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pageIndex: pageIndexReducer,
      commentModify: commentModifyReducer,
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
