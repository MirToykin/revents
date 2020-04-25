import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT} from "./eventConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
}

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
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