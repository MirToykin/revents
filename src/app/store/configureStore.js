import {rootReducer} from "../reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {getFirestore, reduxFirestore} from "redux-firestore";
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import firebase from "../config/firebase";

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);

  return store;
};