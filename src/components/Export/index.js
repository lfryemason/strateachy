import React, { Component } from 'react';

import ReactModal from 'react-modal';

import './index.css';


const modalStyles = {
  content: {
    width: '600px',
    height: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

class ExportModal extends Component {

  copyAll = event =>
  {
    var copyText = document.getElementById("exported_lesson");
  
    copyText.select();

    document.execCommand("copy");

    event.preventDefault();
  }

  render() { 
    const { isOpen, closeModal, data } = this.props;
    return ( 
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className="export_modal_center">
          <textarea 
            name="exported_lesson"
            id="exported_lesson"
            value={data}
            onChange={() => {}}
            className="exported_lesson_textarea"
          />


          <div className="export_button_bar">
            <button
              onClick={this.copyAll}
              className="export_modal_copy"
              type="button"
            >
              Copy to clipboard
            </button>

            <button
              onClick={closeModal}
              className="export_modal_close"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
        
      </ReactModal>
    );
  }
}
 
export default ExportModal;
