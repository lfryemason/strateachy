import React, { Component } from 'react'

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class ActivityModal extends Component
{
  constructor(props) {
    super(props)
  
    const { activity } = this.props;
    this.state = {
       activity: activity
    }
  }
  
  onSave = event =>
  {
    const { activity } = this.state;
    this.props.parent.onSave(activity, event);
  }

  onChange = event =>
  {
    const { activity } = this.state;
    this.setState({ activity: {...activity, [event.target.name]: event.target.value }});
  }

  toggleModalOpen = () =>
  {
    const { activity } = this.props;
    this.setState({activity: activity});
    this.props.parent.toggleModalOpen();
  }

  render()
  {
    const { isOpen } = this.props;
    const { activity } = this.state;
    const isDisabled = activity.name === "";
    return(
      <ReactModal isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={this.toggleModalOpen}
      >
        <form className="modal_form"
          onSubmit={this.onSave}
        >
          <label htmlFor="name">Activity name</label>
          <input 
            name="name"
            id="name"
            value ={activity.name}
            onChange={this.onChange}
            placeholder="Activity name"
          />

          <button 
            type="submit"
            disabled={isDisabled}>
            save
          </button>
          <button
            onClick={this.toggleModalOpen}
          >
            cancel
          </button>
        </form>
      </ReactModal>
    );
  }
}

export default ActivityModal;