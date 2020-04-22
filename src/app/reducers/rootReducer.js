import {eventReducer} from "../../features/event/eventReducer";
import {combineReducers} from "redux";
import {reducer as fromReducer} from "redux-form";

export const rootReducer = combineReducers({
  form: fromReducer,
  events: eventReducer
});