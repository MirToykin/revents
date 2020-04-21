import {eventReducer} from "../../features/event/eventReducer";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
  events: eventReducer
});