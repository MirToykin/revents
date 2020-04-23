import React from 'react';
import {connect} from "react-redux";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const modalLookUp = {
  LoginModal,
  RegisterModal
}

const mapState = (state) => {
  return {
    currentModal: state.modals
  }
}

const ModalManager = ({currentModal}) => {
  let renderModal;

  if (currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookUp[modalType];

    renderModal = <ModalComponent {...modalProps}/>
  }

  return (
    <span>
      {renderModal}
    </span>
  );
};

export default connect(mapState)(ModalManager);
