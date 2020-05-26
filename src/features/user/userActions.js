import {toastr} from 'react-redux-toastr';
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import cuid from "cuid";

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