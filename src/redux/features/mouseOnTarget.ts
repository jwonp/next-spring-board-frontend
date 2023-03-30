import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "../store";
interface mouseOnTargetState {
  target: number;
  isMouseOnControl: boolean;
}

const initialState: mouseOnTargetState = {
  target: -1,
  isMouseOnControl: false,
};

export const mouseOnTarget = createSlice({
  name: "mouseOnTarget",
  initialState,
  reducers: {
    setTarget: (state, actions: { payload: number; type: string }) => {
      state.target = actions.payload;
    },
    resetTarget: (state) => {
      state.target = -1;
    },
    setIsMouseOnControl: (
      state,
      actions: { payload: boolean; type: string }
    ) => {
      state.isMouseOnControl = actions.payload;
    },
  },
});

export const { setTarget, resetTarget, setIsMouseOnControl } =
  mouseOnTarget.actions;
// Other code such as selectors can use the imported `RootState` type
export const getMouseOnTarget = (state: AppState) => state.mouseOnTarget;
export const getTarget = (state: AppState) => state.mouseOnTarget.target;
export const getIsMouseOnControl = (state: AppState) =>
  state.mouseOnTarget.isMouseOnControl;

export default mouseOnTarget.reducer;
