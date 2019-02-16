import React, { Component } from 'react';

class ExpandableRow extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {open: false};
  }

  onClick = event =>
  {
    const currentOpen = this.state.open;
    this.setState( {open: ! currentOpen })
  }

  render()
  {
    const activity = this.props.activity;
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {this.state.open ? 
        <ExpandedRow activity={activity} />
      :
        <UnexpandedRow activity={activity} />
      }
        <hr />
      </div>
    );
  }
}

const ExpandedRow = props =>
{
  const activity = props.activity;
  return ( 
    <div>
      <div>
        {activity.name}
      </div>
      <div>
        <h1>
        {activity.description}
        </h1>
      </div>
    </div>
  );
}

const UnexpandedRow = props =>
{
  const activity = props.activity;
  return ( 
  <div>
    <div>
      {activity.name}
    </div>
  </div>
  );
}

export default ExpandableRow;