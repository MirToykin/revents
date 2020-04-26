import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT} from "./eventConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {toastr} from "react-redux-toastr";

export const createEvent = (event) => dispatch => {
  try {
    dispatch({
      type: CREATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', 'Event has been created.');
  } catch (err) {
    toastr.error('Oops', 'Something went wrong!');
  }
}

export const updateEvent = (event) => dispatch => {
  try {
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', 'Event has been updated.');
  } catch (err) {
    toastr.error('Oops', 'Something went wrong!');
  }
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const loadEvents = () => async dispatch => {
  try {
    dispatch(asyncActionStart());
    //...
    dispatch(asyncActionFinish());
  } catch {
    dispatch(asyncActionError());
  }
}