import {rootReducer} from "../reducers/rootReducer";
import {composeWithDevTools, devToolsEnhancer} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, composedEnhancer);

  return store;
};