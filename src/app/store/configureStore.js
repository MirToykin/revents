import {rootReducer} from "../reducers/rootReducer";
import {devToolsEnhancer} from "redux-devtools-extension";
import {createStore} from "redux";

export const configureStore = () => {
  const store = createStore(rootReducer, devToolsEnhancer());

  return store;
};