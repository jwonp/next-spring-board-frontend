import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { Size } from "@src/static/types/SizeType";
import { Location } from "@src/static/types/LocationType";
interface ImageHandlerState {
  size: Size;
  position: Location;
  isVisible: boolean;
}

const initialState: ImageHandlerState = {
  size: { width: 0, height: 0 },
  position: { x: 0, y: 0 },
  isVisible: false,
};
type SizeActions = {
  payload: Size;
  type: string;
};
type PositionActions = {
  payload: Location;
  type: string;
};
type VisibleActions = {
  payload: boolean;
  type: string;
};
export const imageHandler = createSlice({
  name: "imageHandler",
  initialState,
  reducers: {
    setSize: (state, actions: SizeActions) => {
      state.size = { ...actions.payload };
    },
    setVisible: (state, actions: VisibleActions) => {
      state.isVisible = actions.payload;
    },
    setPosition: (state, actions: PositionActions) => {
      state.position = { ...actions.payload };
    },
  },
});

export const { setSize, setVisible, setPosition } = imageHandler.actions;

export const getimageHandler = (state: AppState) => state.imageHandler;
export const getSize = (state: AppState) => state.imageHandler.size;
export const getIsVisible = (state: AppState) => state.imageHandler.isVisible;
export const getPosition = (state: AppState) => state.imageHandler.position;

export default imageHandler.reducer;
