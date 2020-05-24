import {toastr} from 'react-redux-toastr';
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";

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
export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `users/${user.uid}`;
  const options = {
    name: fileName
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
      name: fileName,
      url: downloadURL
    });
    dispatch(asyncActionFinish());
  } catch(error) {
    console.log(error);
    dispatch(asyncActionError());
  }
  }