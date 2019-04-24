import React from 'react';

import add_act from '../../res/lessonPlanSidePanel.png';
import add_act_button from '../../res/add_act_button.png';
import new_act_button from '../../res/new_act_button.png';

import './helppagetext.css';

export const helpPageText = [
  {
    title: "What is Strateachy?", 
    text: "Strateachy is a free website that offers simple, ad-free, and easy lesson planning. Developed as a student project, Strateachy is built to allow lessons to be described through a name, date and list of activities. The website specializes in using activities and ideas from previously created lesson plans. The website makes it easy to reuse, modify and explore past lesson plans while also giving easy templates to create brand new ideas."
  },
  {
    title: "My save button is greyed out and I can't save my lesson plan!",
    text: "Each lesson plan must have a title and a date. Fill those fields out and try saving again. If that does not work, contact Liam at lfryemason@unm.edu"
  },

  {
    title: "How do I add activities?",
    text: (
      <div>
        Press the "Add Activities" button on your homescreen. This will open a side panel to the right. 
        <img className="help_addact_img"
          rel="addAct"
          src={add_act}
          alt="add activity"
        />
        
        <br />
        From the panel at the right of the screen, you can hover over an activity and click the "+" button, which will add that activity to the lesson plan.
        <div />
        <img
          className="help_addactbutt_img"
          rel="addactbutton"
          src={add_act_button}
          alt="add activity button"
        />
        <div />
         or click the "+" button at the top in order to create a new activity.
        <div />

        <img
          className="help_newactbutt_img"
          rel="newactbutton"
          src={new_act_button}
          alt="new activity button"
        />

        <div />
        Dont forget to save!

      </div>)
  },
  {
    title: "I am not using the default activities, can I get rid of them?",
    text: "Not currently."
  },

];