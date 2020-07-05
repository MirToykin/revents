import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {toastr} from "react-redux-toastr";
import {createNewEvent} from "../../app/common/util/helpers";
import firebase from '../../app/config/firebase';
import {FETCH_EVENTS} from "./eventConstants";

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

export const getEventsForDashboard = () => async (dispatch, getState) => {
  const today = new Date();
  const firestore = firebase.firestore();
  const eventsQuery = firestore.collection('events').where('date', '>=', today);
  let events = [];

  try {
    dispatch(asyncActionStart());
    const eventsSnapshot = await eventsQuery.get();

    for (let i = 0; i < eventsSnapshot.docs.length; i++) {
      let evt = {...eventsSnapshot.docs[i].data(), id: eventsSnapshot.docs[i].id};
      events.push(evt);
    }

    dispatch({type: FETCH_EVENTS, payload: events});
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
}