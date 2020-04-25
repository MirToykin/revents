import {USER_LOGIN, USER_SIGNOUT} from "./authConstants";
import {createReducer} from "../../app/common/util/reducerUtils";

const initialState = {
  authenticated: false,
  currentUser: null
}

const login = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.creds.email
  }
}

const logout = () => {
  return {
    authenticated: false,
    currentUser: null
  }
}

export default createReducer(initialState, {
  [USER_LOGIN]: login,
  [USER_SIGNOUT]: logout
})