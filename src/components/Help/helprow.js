import React, { Component } from 'react';

import './helprow.css';

class HelpRow extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    return(
      <div className="help_row">
        <div className="help_row_title"
            onClick={() => this.setState({open: ! open})}
        >
          {this.props.data.title}
        </div>


        {open ?
          <div className="help_row_text">
            {this.props.data.text}
          </div>
        :
          <div />
        }
      </div>
    )
  }
}

export default HelpRow;