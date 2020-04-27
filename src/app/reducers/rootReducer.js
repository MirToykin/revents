import {eventReducer} from "../../features/event/eventReducer";
import {combineReducers} from "redux";
import {reducer as fromReducer} from "redux-form";
import {reducer as ToasterReducer} from 'react-redux-toastr'
import {modalReducer} from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: fromReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToasterReducer
});