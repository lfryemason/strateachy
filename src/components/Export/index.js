import React, { Component } from 'react';

import ReactModal from 'react-modal';

import { withStore } from '../../Store';
import { withFirestore } from 'react-firestore'
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
  constructor(props) {
    super(props);
    this.state = {  }
  }



  render() { 
    const { isOpen, toggleModalOpen } = this.props;
    const exportedLessonText = "";
    return ( 
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={toggleModalOpen}
        style={modalStyles}
      >

        <textarea 
          name="exported_lesson"
          id="exported_lesson"
          value={exportedLessonText}
          onChange={() => {}}
          className="exported_lesson_textarea"
        />
        
      </ReactModal>
    );
  }
}
 
export default ExportModal;