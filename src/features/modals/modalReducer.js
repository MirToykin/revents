import {createReducer} from "../../app/common/util/reducerUtils";
import {MODAL_CLOSE, MODAL_OPEN} from "./modalConstants";

const initialState = null;

const openModal = (state, payload) => {
  const {modalType, modalProps} = payload;
  return {
    modalType,
    modalProps
  }
}

const closeModal = () => {
  return null;
}

export const modalReducer = createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
})