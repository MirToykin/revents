import {toastr} from 'react-redux-toastr';
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import cuid from "cuid";
import firebase from '../../app/config/firebase'
import {FETCH_EVENTS} from "../event/eventConstants";

export const updateProfile = user => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  const {isEmpty, isLoaded, ...updatedProfile} = user;
  try {
    await firebase.updateProfile(updatedProfile);
    toastr.success('Success', 'Your profile has been updated');
  } catch (error) {
    console.log(error);
  }
}
export const uploadProfileImage = (file) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {

    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `users/${user.uid}/user_images`;
    const options = {
      name: imageName
    }

    try {
      dispatch(asyncActionStart());
      // upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get uploadd image url
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile
      if (!userDoc.data().photoURL) {
        firebase.updateProfile({
          photoURL: downloadURL
        });
        user.updateProfile({
          photoURL: downloadURL
        })
      }
      // add the image to firestore
      firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'images'}]
      }, {
        name: imageName,
        url: downloadURL
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }

export const deleteImage = (image) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`users/${user.uid}/user_images/${image.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'images', doc: image.id}]
      })
    } catch (error) {
      console.log(error);
      throw new Error('Some problem with photo deleting')
    }
  }

export const setMainImage = (image) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    try {
      await firebase.updateProfile({
        photoURL: image.url
      })
    } catch (error) {
      console.log(error);
      throw new Error('Some problem with photo setting')
    }
  }

export const goingToEvent = (event) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || '/assets/user.png',
    displayName: profile.displayName,
    host: false
  }

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });

    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    });

    toastr.success('Success', 'You have signed up to the event');
  } catch(error) {
    console.log(error);
    toastr.error('Oops', 'Problem signing up to the event');
  }
}

export const cancelGoingToEvent = (event) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });

    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success('Success', 'You have removed yourself from the event')
  } catch (error) {
    console.log(error);
    toastr.error('Oops', 'Something went wrong')
  }
}

export const getUserEvents = (userUid, activeTab) => async (dispatch) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  const eventsRef = firestore.collection('event_attendee');
  let query;

  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where('eventDate', '<=', today)
        .where('userUid', '==', userUid)
        .orderBy('eventDate', "desc");
      break;
    case 2: // future events
      query = eventsRef
        .where('eventDate', '>=', today)
        .where('userUid', '==', userUid)
        .orderBy('eventDate');
      break;
    case 3: // hosted events
      query = eventsRef
        .where('host', '==', true)
        .where('userUid', '==', userUid)
        .orderBy('eventDate', "desc");
      break;
    default:
      query = eventsRef
        .where('userUid', '==', userUid)
        .orderBy('eventDate', "desc");
  }

  try {
    const querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
      events.push({...evt.data(), id: evt.id});
    }

    dispatch({type: FETCH_EVENTS, payload: events});
    dispatch(asyncActionFinish());
  } catch(error) {
    console.log(error);
    dispatch(asyncActionError());
  }
}