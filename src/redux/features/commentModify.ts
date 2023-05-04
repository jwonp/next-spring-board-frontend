import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface CommentModifyState {
  modifyIndex: number;
}

const initialState: CommentModifyState = {
  modifyIndex: -1,
};

export const commentModify = createSlice({
  name: "commentModify",
  initialState,
  reducers: {
    setModifyIndex: (state, actions) => {
      state.modifyIndex = actions.payload;
    },
    resetModifyIndex: (state) => {
      state.modifyIndex = -1;
    },
  },
});

export const { setModifyIndex, resetModifyIndex } = commentModify.actions;

export const getModifyIndex = (state: AppState) =>
  state.commentModify.modifyIndex;

export default commentModify.reducer;
