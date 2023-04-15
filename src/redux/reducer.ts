import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import pageIndexReducer from "./features/pageIndex";

const combinedReducer = combineReducers({
  pageIndex: pageIndexReducer,
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
