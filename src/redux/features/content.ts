import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import {
  ContentBarAddType,
  ContentBarDataType,
  ContentTypeType,
} from "@src/static/types/ContentDataType";
import { createNewContent } from "@src/components/func/ContentEditFuncs";
interface ContentState {
  contents: ContentBarDataType[];
  images: string[];
  imageFocusIdnex: number;
}

const initialState: ContentState = {
  contents: [{ type: "text", content: "", image: "" }],
  images: [],
  imageFocusIdnex: -1,
};

export type ModifyDataType = { index: number; content: string };
export type AddDataType = { index: number; content: ContentBarDataType };

type ContentsActionType = {
  payload: ContentBarDataType[];
  type: string;
};

type ContentActionType = {
  payload: ContentBarDataType;
  type: string;
};

type ModifyByIndexActionType = {
  payload: ModifyDataType;
  type: string;
};

type addWithIndexActionType = {
  payload: AddDataType;
  type: string;
};
type addNewContentActionType = {
  payload: ContentBarAddType;
  type: string;
};
type DeleteByIndexActionType = {
  payload: number;
  type: string;
};
type indexActionType = {
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

    addNewContent: (state, actions: addNewContentActionType) => {
      const newContent = createNewContent(
        actions.payload.content,
        actions.payload.type
      );

      if (state.contents.length === 0) {
        state.contents = [newContent];
        return;
      }
      if (actions.payload.target === state.contents.length - 1) {
        state.contents = [...state.contents, newContent];
        return;
      }

      const tempContents = [...state.contents];
      tempContents.splice(actions.payload.target + 1, 0, newContent);
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
      const image = state.contents[actions.payload].image;
      state.contents = state.contents.filter(
        (_, index) => index != actions.payload
      );
      state.images = state.images.filter((value) => value !== image);
    },
    resetContents: (state) => {
      state.contents = [{ type: "text", content: "", image: "" }];
    },

    addImage: (state, actions) => {
      state.images.push(actions.payload);
    },
    removeImageByIndex: (state, actions: DeleteByIndexActionType) => {
      state.images = state.images.filter(
        (_, index) => actions.payload != index
      );
    },
    setImageFocusIndex: (state, actions: indexActionType) => {
      state.imageFocusIdnex = actions.payload;
    },
    resetImages: (state) => {
      state.images = [];
    },
    resetContent: (state) => {
      state.contents = [{ type: "text", content: "", image: "" }];
      state.images = [];
    },
    resetImageFocusIndex: (state) => {
      state.imageFocusIdnex = -1;
    },
  },
});

export const {
  setContents,
  addContent,
  addContentByIndex,
  addNewContent,
  modifyContentByIndex,
  removeContentByIndex,
  resetContents,
  addImage,
  removeImageByIndex,
  setImageFocusIndex,
  resetImages,
  resetContent,
  resetImageFocusIndex,
} = content.actions;

export const getContent = (state: AppState) => state.content;
export const getContents = (state: AppState) => state.content.contents;
export const getImages = (state: AppState) => state.content.images;
export const getImageFocusIndex = (state: AppState) =>
  state.content.imageFocusIdnex;

export default content.reducer;
