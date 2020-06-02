import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {toastr} from "react-redux-toastr";
import {createNewEvent} from "../../app/common/util/helpers";

export const createEvent = (event) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL;
  const newEvent = createNewEvent(user, photoURL, event);
  try {
    const createdEvent = await firestore.add('events', newEvent);
    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true
    });
    toastr.success('Success!', 'Event has been created.');
    return createdEvent;
  } catch (err) {
    toastr.error('Oops', 'Something went wrong!');
  }
}

export const updateEvent = (event) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();

  try {
    firestore.update(`events/${event.id}`, event);
    toastr.success('Success!', 'Event has been updated.');
  } catch (err) {
    toastr.error('Oops', 'Something went wrong!');
  }
}

export const cancelToggle = (cancelled, eventId) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const message = cancelled ? 'Do you want to cancel the event?' : 'This reactivate the event';

  try {
    toastr.confirm(message, {
      onOk: async () => {
        await firestore.update(`events/${eventId}`, {
          cancelled
        })
      }
    })
  } catch(error) {
    console.log(error);
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