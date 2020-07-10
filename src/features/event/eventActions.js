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
  } catch (error) {
    console.log(error);
  }
}

export const getEventsForDashboard = (lastEvent) => async (dispatch) => {
  const today = new Date();
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('events');
  let events = [];

  try {
    dispatch(asyncActionStart());
    let startAfter = lastEvent && await eventsRef.doc(lastEvent.id).get();
    let query;

    lastEvent ? (query = eventsRef
        // .where('date', '>=', today)
        .orderBy('date')
        .startAfter(startAfter)
        .limit(2)) :
      (query = eventsRef
        // .where('date', '>=', today)
        .orderBy('date')
        .limit(2));

    const eventsSnapshot = await query.get();

    if (!eventsSnapshot.docs.length) {
      dispatch(asyncActionFinish());
      return eventsSnapshot;
    }

    for (let i = 0; i < eventsSnapshot.docs.length; i++) {
      let evt = {...eventsSnapshot.docs[i].data(), id: eventsSnapshot.docs[i].id};
      events.push(evt);
    }

    dispatch({type: FETCH_EVENTS, payload: events});
    dispatch(asyncActionFinish());
    return eventsSnapshot;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
}

export const addEventComment = (eventId, comment) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();

  try {
    firebase.push(`events_chat/${eventId}`, comment);
  } catch(error) {
    console.log(error);
    toastr.error('Oops', 'Problem adding comment');
  }
}