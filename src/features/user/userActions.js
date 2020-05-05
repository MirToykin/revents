import {toastr} from 'react-redux-toastr'

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