import React from 'react';

import { withAuthorization, authCondition } from '../Session';

import {withRouter} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const LandingPage = props =>{
    props.history.push(ROUTES.HOME)
    return(<div />);
  }
;

export default withAuthorization(authCondition)(withRouter(LandingPage));