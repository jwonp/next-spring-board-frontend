import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import {
  ContentBarAddType,
  ContentBarDataType,
} from "@src/static/types/ContentDataType";
import { createNewContent } from "@src/components/func/ContentEditFuncs";
import { SwapContentsType } from "@src/static/types/SwapContentsType";
import { __One, __Zero } from "@src/static/numbers/numberSet";
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

type AddWithIndexActionType = {
  payload: AddDataType;
  type: string;
};
type AddNewContentActionType = {
  payload: ContentBarAddType;
  type: string;
};
type DeleteByIndexActionType = {
  payload: number;
  type: string;
};
type IndexActionType = {
  payload: number;
  type: string;
};
type SwapActionsType = {
  payload: SwapContentsType;
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
    addContentByIndex: (state, actions: AddWithIndexActionType) => {
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

    addNewContent: (state, actions: AddNewContentActionType) => {
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
    swapElementsSequenceInContents: (state, actions: SwapActionsType) => {
      const { target, moveTo } = actions.payload;

      if (target < __Zero || moveTo < __Zero || target === moveTo) return;

      const tempContents = [...state.contents];
      const tempContent = tempContents.splice(target, __One)[__Zero];
      tempContents.splice(moveTo, __Zero, tempContent);

      state.contents = tempContents;
    },
    addImage: (state, actions) => {
      state.images.push(actions.payload);
    },
    removeImageByIndex: (state, actions: DeleteByIndexActionType) => {
      state.images = state.images.filter(
        (_, index) => actions.payload != index
      );
    },
    setImageFocusIndex: (state, actions: IndexActionType) => {
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
  swapElementsSequenceInContents,
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
