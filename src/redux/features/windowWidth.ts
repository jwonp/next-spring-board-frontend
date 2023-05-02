import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface windowWidthState {
  width: any;
}

const initialState: windowWidthState = {
  width: 0,
};

export const windowWidth = createSlice({
  name: "windowWidth",
  initialState,
  reducers: {
    setWidth: (state, actions) => {
      state.width = actions.payload;
    },
  },
});

export const { setWidth } = windowWidth.actions;

export const getWindowWidth = (state: AppState) => state.windowWidth;
export const getWidth = (state: AppState) => state.windowWidth.width;

export default windowWidth.reducer;
