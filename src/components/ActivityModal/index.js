import React, { Component } from 'react'

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class ActivityModal extends Component
{
  render()
  {
    const { toggleModalOpen, onChange, onSave } = this.props.parent;
    const { isOpen, activity } = this.props;
    const isDisabled = activity.name === "";
    return(
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={toggleModalOpen}
      >
        <form className="modal_form"
          onSubmit={onSave}
        >
          <label htmlFor="name">Activity name</label>
          <input 
            name="name"
            id="name"
            value ={activity.name}
            onChange={onChange}
            placeholder="Activity name"
          />

          <button 
            type="submit"
            disabled={isDisabled}>
            save
          </button>
        </form>
      </ReactModal>
    );
  }
}

export default ActivityModal;