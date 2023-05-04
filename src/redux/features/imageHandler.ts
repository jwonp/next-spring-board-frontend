import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { SizeType } from "@src/static/types/SizeType";
import { LocationType } from "@src/static/types/LocationType";
interface ImageHandlerState {
  size: SizeType;
  position: LocationType;
  isVisible: boolean;
}

const initialState: ImageHandlerState = {
  size: { width: 0, height: 0 },
  position: { x: 0, y: 0 },
  isVisible: false,
};
type SizeActionsType = {
  payload: SizeType;
  type: string;
};
type PositionActionsType = {
  payload: LocationType;
  type: string;
};
type VisibleActionsType = {
  payload: boolean;
  type: string;
};
export const imageHandler = createSlice({
  name: "imageHandler",
  initialState,
  reducers: {
    setSize: (state, actions: SizeActionsType) => {
      state.size = { ...actions.payload };
    },
    setVisible: (state, actions: VisibleActionsType) => {
      state.isVisible = actions.payload;
    },
    setPosition: (state, actions: PositionActionsType) => {
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
