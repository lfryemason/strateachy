import React from 'react';

import HelpRow from './helprow';

import { helpPageText } from './helppagetext'
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './index.css';

const HelpPage = () => (
  <div className="help_page">
    <div
      className="help_title"
    >
    Frequently Asked Questions (FAQ)
    </div>

    <Link to={ROUTES.HOME} className="help_link_home">Home page</Link>

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
      Contact Liam Frye-Mason at lfryemason@unm.edu if you have any other questions or comments.
    </div>
  </div>
);



export default withRouter(HelpPage);