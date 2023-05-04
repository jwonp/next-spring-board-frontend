import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface PageIndexState {
  index: number;
}

const initialState: PageIndexState = {
  index: 0,
};

export const pageIndex = createSlice({
  name: "pageIndex",
  initialState,
  reducers: {
    setIndex: (state, actions) => {
      state.index = actions.payload;
    },

    //actions.payload is meaning maxIndex
    //
    plusOne: (state, actions) => {
      if (state.index + 1 < actions.payload) {
        state.index += 1;
      }
    },
    minusOne: (state) => {
      if (0 <= state.index - 1) {
        state.index -= 1;
      }
    },
    plusTen: (state, actions) => {
      if (state.index + 10 < actions.payload) {
        state.index += 10;
      }
    },
    minusTen: (state) => {
      if (0 <= state.index - 10) {
        state.index -= 10;
      }
    },
    //
  },
});

export const { setIndex, plusOne, minusOne, plusTen, minusTen } =
  pageIndex.actions;

export const getPageIndex = (state: AppState) => state.pageIndex;
export const getIndex = (state: AppState) => state.pageIndex.index;

export default pageIndex.reducer;
