import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import pageIndexReducer from "./features/pageIndex";
import commentModifyReducer from "./features/commentModify";
import windowWidthReducer from "./features/windowWidth";
import imageHandlerReducer from "./features/imageHandler";
import contentReducer from "./features/content";
// import [name]Reducer from "./features/[name]";

import { Action } from "redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pageIndex: pageIndexReducer,
      commentModify: commentModifyReducer,
      windowWidth: windowWidthReducer,
      imageHandler: imageHandlerReducer,
      content: contentReducer,
      // [name]: [name]Reducer,
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
// store.subscribe(() => console.log(store.getState().content.contents));
export default store;
