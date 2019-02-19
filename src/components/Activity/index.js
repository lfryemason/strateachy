import React, { Component } from 'react';

import ActivityModal from '../ActivityModal';

import "./index.css";

class Activity extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {
      open: false,
      isModalOpen: false,
    };
  }

  onClick = () =>
  {
    if ( ! this.state.isModalOpen )
    {
      const currentOpen = this.state.open;
      this.setState( {open: ! currentOpen })
    }
  }

  setModalOpen = isModalOpen =>
  {
    this.setState({...this.state, isModalOpen: isModalOpen});
  }

  render()
  {
    const activity = this.props.activity;
    const { isModalOpen } = this.state;
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {this.state.open ? 
        <div>
          <TitleRow activity={activity} />
          <ExpandedRow activity={activity} parent={this} isModalOpen={isModalOpen} openModal={this.setModalOpen(true)}/>
        </div>
      :
        <TitleRow activity={activity} />
      }
        
      <ActivityModal isOpen={isModalOpen}
        onRequestClose={this.closeModal}
      />
      </div>
    );
  }
}

class ExpandedRow extends Component
{
  editEvent = event =>
  {
    this.props.openModal();
    event.stopPropagation();
  }

  removeEvent = event =>
  {
    event.stopPropagation();
  }

  render()
  {
    const { activity } = this.props;
    return ( 
      <div className="expanded_row">
        <div className="expanded_details">
          <div className="expanded_age">
            <b>Age:</b> {activity.age}
          </div>
          <div className="expanded_level">
            <b>Level:</b> {activity.level}
          </div>
        </div>
        <div className="expanded_description">
          {activity.description}
        </div>
        <div className="expanded_buttons">
          <button className="edit_button"
            onClick={this.editEvent}
          >
            edit
          </button>
          <button className="remove_button"
            onClick={this.removeEvent}
          >
            remove from lesson
          </button>
        </div>
      </div>
    ); 
  }
}

const TitleRow = props =>
{
  const activity = props.activity;
  return ( 
  <div className="row_title">
    <div className="activity_name">
      {activity.name}
    </div>
    <div className="activity_duration">
      {activity.duration} mins.
    </div>
  </div>
  );
}

export default Activity;