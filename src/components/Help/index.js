import React from 'react';

import HelpRow from './helprow';

import { helpPageText } from './helppagetext'

import { withAuthorization, authCondition } from '../Session';

import './index.css';

const HelpPage = () => (
  <div className="help_page">
    <div
      className="help_title"
    >
    Frequently Asked Questions (FAQ)
    </div>

    <div className="help_posts">
      {helpPageText.map((item, index) => 
        <HelpRow 
          className="help_post"
          key={index}
          data={item}
        />
      )}
    </div>

    <div className="contact_info">
      Any other questions or comments, contact Liam Frye-Mason at lfryemason@unm.edu
    </div>
  </div>
);



export default withAuthorization(authCondition)(HelpPage);