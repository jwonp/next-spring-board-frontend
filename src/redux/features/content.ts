import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
interface ContentState {
  contents: ContentBarDataType[];
}

const initialState: ContentState = {
  contents: [{ type: "text", content: "", image: "" }],
};

type ContentsActionType = {
  payload: ContentBarDataType[];
  type: string;
};
type ContentActionType = {
  payload: ContentBarDataType;
  type: string;
};
export type ModifyDataType = { index: number; content: string };

type ModifyByIndexActionType = {
  payload: ModifyDataType;
  type: string;
};
export type AddDataType = { index: number; content: ContentBarDataType };

type addWithIndexActionType = {
  payload: AddDataType;
  type: string;
};
type DeleteByIndexActionType = {
  payload: number;
  type: string;
};
export const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContents: (state, actions: ContentsActionType) => {
      if (actions.payload.length === 0) {
        return;
      }
      state.contents = [...actions.payload];
    },
    addContent: (state, actions: ContentActionType) => {
      state.contents = [...state.contents, actions.payload];
    },
    addContentByIndex: (state, actions: addWithIndexActionType) => {
      const tempContents = [...state.contents];
      tempContents.splice(
        actions.payload.index + 1,
        0,
        actions.payload.content
      );
      if (tempContents.length === 0) {
        return;
      }
      state.contents = tempContents;
    },
    modifyContentByIndex: (state, actions: ModifyByIndexActionType) => {
      const modifiedContent: ContentBarDataType = {
        type: "text",
        content: actions.payload.content,
        image: "",
      };
      state.contents[actions.payload.index] = { ...modifiedContent };
    },
    removeContentByIndex: (state, actions: DeleteByIndexActionType) => {
      state.contents = state.contents.filter(
        (value, index) => index != actions.payload
      );
    },
    resetContents: (state) => {
      state.contents = [{ type: "text", content: "", image: "" }];
    },
  },
});

export const {
  setContents,
  addContent,
  addContentByIndex,
  modifyContentByIndex,
  removeContentByIndex,
  resetContents,
} = content.actions;

export const getContent = (state: AppState) => state.content;
export const getContents = (state: AppState) => state.content.contents;

export default content.reducer;
