import React, { Component } from 'react';
import { FirestoreProvider } from 'react-firestore';

import { withAuthorization, authCondition } from '../Session';
import { withFirebase } from '../../Firebase';
import Store from '../../Store';


import LessonPlanList from '../LessonPlanList';
import LessonPlanExpand from '../LessonPlanExpand';

import './index.css';
import ActivityList from '../ActivityList';

import styled from "@emotion/styled";

const HomePageDiv = styled.div`
  display: flex;
  overflow: hidden;
  width:  125vw;
  height:  calc(100vh - 50px);
  position: relative;
  left: -25vw;

  transform: translateX(${({ lessonPlanSidePanelOpen }) => (lessonPlanSidePanelOpen ? "25vw" : "0")});
  transition: transform 1s;
`;


class HomePage extends Component
{
  state = {
    lessonPlanSidePanelOpen: true,
  }

  setSidebars = (type) =>
  {
    const res = type === "lessonPlanList";
    this.setState({lessonPlanSidePanelOpen: res});
  }

  render()
  {
    const { lessonPlanSidePanelOpen } = this.state;
    return(
      <HomePageDiv lessonPlanSidePanelOpen={lessonPlanSidePanelOpen}>
        <FirestoreProvider firebase={this.props.firebase}>
          <Store>

            <div className="lesson_plan_sidebar">
              <LessonPlanList />
            </div>

            <div className="main_lesson_plan">
              <LessonPlanExpand setSidebars={this.setSidebars}/>
            </div>

            <div className="activity_sidebar">
              <ActivityList type="sidePanel"/>
            </div>

          </Store>
        </FirestoreProvider>
      </HomePageDiv>
    );
  }
}

export default withFirebase(withAuthorization(authCondition)(HomePage));