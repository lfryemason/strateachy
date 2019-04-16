import React, { Component } from 'react'

import ReactModal from 'react-modal';

import './index.css';

ReactModal.setAppElement('#root');

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

class ActivityModal extends Component
{
  constructor(props) {
    super(props)
  
    const { activity } = this.props;
    this.state = {
       activity: activity
    }
  }

  componentDidUpdate()
  {
    if ( (this.state.activity !== this.props.activity && ! this.props.isOpen) 
         || this.props.refresh )
    {
      const { activity } = this.props;
      this.setState({activity: activity});
      this.props.modalUpdated();
    }
  }

  onSave = event =>
  {
    const { activity } = this.state;
    this.props.onSave(activity, event);
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
    this.props.toggleModalOpen();
  }

  toggleDeleteModalOpen = () =>
  {
    this.toggleModalOpen();
    this.props.toggleDeleteModalOpen();
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
        style={modalStyles}
      >
        <div className="activity_modal_div">

          <div className="activity_modal_title">
            Edit Activity
          </div>

          <form className="activity_modal_form"
            onSubmit={this.onSave}
          >
            <div className="activity_modal_center">
              <div className="activity_modal_left">
                <label htmlFor="modal_name">Activity name</label>
                <input 
                  name="name"
                  id="modal_name"
                  value ={activity.name}
                  onChange={this.onChange}
                  placeholder="e.g. twinkle mashup"
                  className="activity_modal_input"
                />

                <label htmlFor="modal_duration">Activity duration</label>
                <div className="activity_modal_duration_text">
                  <input 
                    name="duration"
                    id="modal_duration"
                    value ={activity.duration}
                    onChange={this.onChange}
                    placeholder="Duration of the activity"
                    className="activity_modal_input activity_modal_duration"
                  />
                  minutes
                </div>

                <label htmlFor="modal_age">Age</label>
                <input 
                  name="age"
                  id="modal_age"
                  value ={activity.age}
                  onChange={this.onChange}
                  placeholder="e.g. 5-8 or all ages"
                  className="activity_modal_input"
                />


                <label htmlFor="modal_level">Level</label>
                <input 
                  name="level"
                  id="modal_level"
                  value ={activity.level}
                  onChange={this.onChange}
                  placeholder="e.g. early book 1 or any"
                  className="activity_modal_input"
                />
              </div>

              <div className="activity_modal_right">
                <label htmlFor="activity_modal_description">Description</label>
                <textarea 
                  name="description"
                  id="activity_modal_description"
                  value ={activity.description}
                  onChange={this.onChange}
                  placeholder="What do you do in the activity?"
                  className="activity_modal_description"
                />
              </div>
            </div>

            <div className="activity_modal_buttons">
              <button 
                onClick={this.toggleDeleteModalOpen}
                className="activity_modal_delete"
                type="button"
              >
                Delete
              </button>

              <div className="save_cancel_activity_modal">
                <button
                  onClick={this.toggleModalOpen}
                  className="activity_modal_cancel"
                  type="button"
                >
                  Cancel
                </button>

                <button 
                  type="submit"
                  disabled={isDisabled}
                  className="activity_modal_save"
                >
                  Save
                </button>
              </div>
            </div>
      
          </form>
        </div>
      </ReactModal>
    );
  }
}

export default ActivityModal;