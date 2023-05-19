import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import {
  NewContentBar,
  ContentBarData,
} from "@src/static/types/ContentDataType";
import { createNewContent } from "@src/components/func/ContentEditFuncs";
import { ContentSwapIndexs } from "@src/static/types/SwapContentsType";
import { __One, __Zero } from "@src/static/numbers/numberSet";

interface ContentState {
  contents: ContentBarData[];
  images: string[];
  imageFocusIdnex: number;
}

const initialState: ContentState = {
  contents: [{ type: "text", content: "", image: "" }],
  images: [],
  imageFocusIdnex: -1,
};

export type ModifyData = { index: number; content: string };
export type NewData = { index: number; content: ContentBarData };

type ContentsActions = {
  payload: ContentBarData[];
  type: string;
};

type ContentActions = {
  payload: ContentBarData;
  type: string;
};

type ModifyByIndexActions = {
  payload: ModifyData;
  type: string;
};

type AddWithIndexActions = {
  payload: NewData;
  type: string;
};
type AddNewContentActions = {
  payload: NewContentBar;
  type: string;
};
type DeleteByIndexActions = {
  payload: number;
  type: string;
};
type IndexActions = {
  payload: number;
  type: string;
};
type SwapActions = {
  payload: ContentSwapIndexs;
  type: string;
};
export const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContents: (state, actions: ContentsActions) => {
      if (actions.payload.length === 0) {
        return;
      }
      state.contents = [...actions.payload];
    },
    addContent: (state, actions: ContentActions) => {
      state.contents = [...state.contents, actions.payload];
    },
    addContentByIndex: (state, actions: AddWithIndexActions) => {
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

    addNewContent: (state, actions: AddNewContentActions) => {
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
    modifyContentByIndex: (state, actions: ModifyByIndexActions) => {
      const modifiedContent: ContentBarData = {
        type: "text",
        content: actions.payload.content,
        image: "",
      };

      state.contents[actions.payload.index] = { ...modifiedContent };
    },
    removeContentByIndex: (state, actions: DeleteByIndexActions) => {
      const image = state.contents[actions.payload].image;
      state.contents = state.contents.filter(
        (_, index) => index != actions.payload
      );
      state.images = state.images.filter((value) => value !== image);
    },
    resetContents: (state) => {
      state.contents = [{ type: "text", content: "", image: "" }];
    },
    swapElementsSequenceInContents: (state, actions: SwapActions) => {
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
    removeImageByIndex: (state, actions: DeleteByIndexActions) => {
      state.images = state.images.filter(
        (_, index) => actions.payload != index
      );
    },
    setImageFocusIndex: (state, actions: IndexActions) => {
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
