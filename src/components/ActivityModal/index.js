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
          <label htmlFor="modal_name">Activity name</label>
          <input 
            name="name"
            id="modal_name"
            value ={activity.name}
            onChange={this.onChange}
            placeholder="Activity name"
          />

          <label htmlFor="modal_duration">Activity duration</label>
          <input 
            name="duration"
            id="modal_duration"
            value ={activity.duration}
            onChange={this.onChange}
            placeholder="Activity duration"
          />

          <label htmlFor="modal_age">Age level</label>
          <input 
            name="age"
            id="modal_age"
            value ={activity.age}
            onChange={this.onChange}
            placeholder="Age level"
          />


          <label htmlFor="modal_level">Skill level</label>
          <input 
            name="level"
            id="modal_level"
            value ={activity.level}
            onChange={this.onChange}
            placeholder="Skill level"
          />

          <label htmlFor="modal_description">Description</label>
          <input 
            name="description"
            id="modal_description"
            value ={activity.description}
            onChange={this.onChange}
            placeholder="Type an overview of the activity here"
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