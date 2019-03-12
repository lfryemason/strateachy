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

  toggleSidebars = () =>
  {
    this.setState({lessonPlanSidePanelOpen: ! this.state.lessonPlanSidePanelOpen});
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

            <div>
              { lessonPlanSidePanelOpen ?
                <div className="main_lesson_plan">
                  <div className="lesson_plan_home">
                    <LessonPlanExpand />
                  </div>

                  <button className="toggle_sidepanels"
                    onClick={this.toggleSidebars}
                  >
                    &gt;
                  </button>
                </div>
                :
                <div className="main_lesson_plan">
                  <button className="toggle_sidepanels"
                    onClick={this.toggleSidebars}
                  >
                    &lt;
                  </button>

                  <div className="lesson_plan_home">
                    <LessonPlanExpand />
                  </div>
                </div>
              }
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