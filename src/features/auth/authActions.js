import {USER_LOGIN, USER_SIGNOUT} from "./authConstants";
import {closeModal} from "../modals/modalActions";

export const login = (creds) => dispatch => {
  dispatch({type: USER_LOGIN, payload: {creds}});
  dispatch(closeModal());
}

export const logout = () => {
  return {
    type: USER_SIGNOUT
  }
}