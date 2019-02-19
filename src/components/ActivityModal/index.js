import React, { Component } from 'react'

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class ActivityModal extends Component
{
  render()
  {
    const { isOpen, onRequestClose } = this.props;
    return(
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onRequestClose}
      >
        <h1>
          MODAL DIALOG
        </h1>
      </ReactModal>
    );
  }
}

export default ActivityModal;