import React, { Component } from 'react'

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class DeleteModal extends Component
{
  render()
  {
    const { onDelete, toggleModal, isOpen} = this.props;
    return(
      <div className="delete_modal">
        <ReactModal isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={toggleModal}
        >
          <p>Are you sure you want to delete this forever?<br/>
              This action cannot be undone.</p>

        <button type="button" 
            className="delete_button"
            onClick={onDelete}>
          Delete
        </button>
        
        <button type="button" 
            className="cancel_button"
            onClick={toggleModal}>
          Cancel
        </button>
        </ReactModal>
      </div>
    );
  }
}

export default DeleteModal;