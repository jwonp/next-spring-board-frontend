import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import pageIndexReducer from "./features/pageIndex";
import commentModifyReducer from "./features/commentModify";
import windowWidthReducer from "./features/windowWidth";
import imageHandlerReducer from "./features/imageHandler";
import contentReducer from "./features/content";
import menuToggleReducer from "./features/menuToggle";
// import [name]Reducer from "./features/[name]";

const combinedReducer = combineReducers({
  pageIndex: pageIndexReducer,
  commentModify: commentModifyReducer,
  windowWidth: windowWidthReducer,
  imageHandler: imageHandlerReducer,
  content: contentReducer,
  menuToggle: menuToggleReducer,
  // [name]: [name]Reducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export default rootReducer;
