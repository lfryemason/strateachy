import React, { Component } from 'react'

import ReactModal from 'react-modal';

import './index.css';

ReactModal.setAppElement('#root');

const deleteModalStyles = {
  content: {
    width: 300,
    height: 100,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

class DeleteModal extends Component
{
  render()
  {
    const { onDelete, toggleModal, isOpen} = this.props;
    return(
      <ReactModal isOpen={isOpen}
        style={deleteModalStyles}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={toggleModal}
      >
        <div className="delete_modal">
          <p className="delete_modal_text">Delete forever?</p>

        <div className="delete_modal_buttons">
          <button type="button" 
              className="delete_modal_cancel_button"
              onClick={toggleModal}>
            Cancel
          </button>

          <button type="button" 
              className="delete_modal_delete_button"
              onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </ReactModal>
    );
  }
}

export default DeleteModal;