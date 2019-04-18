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
  render() { 
    const { isOpen, closeModal, data } = this.props;
    return ( 
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <textarea 
          name="exported_lesson"
          id="exported_lesson"
          value={data}
          onChange={() => {}}
          className="exported_lesson_textarea"
        />
        
      </ReactModal>
    );
  }
}
 
export default ExportModal;
