import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface MenuToggleState {
  isAppDrawerOpened: boolean;
}

const initialState: MenuToggleState = {
  isAppDrawerOpened: false,
};

export const menuToggle = createSlice({
  name: "menuToggle",
  initialState,
  reducers: {
    setIsAppDrawerOpened: (state, actions) => {
      state.isAppDrawerOpened = actions.payload;
    },
    toggleIsAppDrawerOpened: (state) => {
      state.isAppDrawerOpened = !state.isAppDrawerOpened;
    },
  },
});

export const { setIsAppDrawerOpened, toggleIsAppDrawerOpened } =
  menuToggle.actions;

export const getMenuToggle = (state: AppState) => state.menuToggle;
export const getIsAppDrawerOpened = (state: AppState) =>
  state.menuToggle.isAppDrawerOpened;

export default menuToggle.reducer;
