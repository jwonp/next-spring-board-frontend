import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface pageIndexState {
  index: number;
}

const initialState: pageIndexState = {
  index: 0,
};

export const pageIndex = createSlice({
  name: "pageIndex",
  initialState,
  reducers: {
    setIndex: (state, actions) => {
      state.index = actions.payload;
    },
  },
});

export const { setIndex } = pageIndex.actions;
// Other code such as selectors can use the imported `RootState` type
export const getPageIndex = (state: AppState) => state.pageIndex;
export const getIndex = (state: AppState) => state.pageIndex.index;

export default pageIndex.reducer;
