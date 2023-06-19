import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

}

const initialState: ContentState = {
  contents: [{ type: "text", content: "" }],
  images: [],
  
};

export type ModifyData = { index: number; content: string };

export const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContents: (state, actions: PayloadAction<ContentBarData[]>) => {
      if (actions.payload.length === 0) {
        return;
      }
      state.contents = [...actions.payload];
    },
    addContent: (state, actions: PayloadAction<ContentBarData>) => {
      state.contents = [...state.contents, actions.payload];
    },

    addNewContent: (state, actions: PayloadAction<NewContentBar>) => {
      const newContent = createNewContent(
        actions.payload.content.content,
        actions.payload.content.type
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
    modifyContentByIndex: (state, actions: PayloadAction<ModifyData>) => {
      const modifiedContent: ContentBarData = {
        type: "text",
        content: actions.payload.content,
      };

      state.contents[actions.payload.index] = { ...modifiedContent };
    },
    removeContentByIndex: (state, actions: PayloadAction<number>) => {
      const image = state.contents[actions.payload].content;
      state.contents = state.contents.filter(
        (_, index) => index != actions.payload
      );
      state.images = state.images.filter((value) => value !== image);
    },
    resetContents: (state) => {
      state.contents = [{ type: "text", content: "" }];
    },
    swapElementsSequenceInContents: (
      state,
      actions: PayloadAction<ContentSwapIndexs>
    ) => {
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
    removeImageByIndex: (state, actions: PayloadAction<number>) => {
      state.images = state.images.filter(
        (_, index) => actions.payload != index
      );
    },
 
    resetImages: (state) => {
      state.images = [];
    },
    resetContent: (state) => {
      state.contents = [{ type: "text", content: "" }];
      state.images = [];
    },

  },
});

export const {
  setContents,
  addContent,
  addNewContent,
  modifyContentByIndex,
  removeContentByIndex,
  swapElementsSequenceInContents,
  resetContents,
  addImage,
  removeImageByIndex,

  resetImages,
  resetContent,

} = content.actions;

export const getContent = (state: AppState) => state.content;
export const getContents = (state: AppState) => state.content.contents;
export const getImages = (state: AppState) => state.content.images;


export default content.reducer;
