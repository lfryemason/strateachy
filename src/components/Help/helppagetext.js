import React from 'react';

import add_act from '../../res/lessonPlanSidePanel.png';
import add_act_button from '../../res/add_act_button.png';
import new_act_button from '../../res/new_act_button.png';
import open_act from '../../res/openactivity.png';
import edit_act from '../../res/edit_activity.png';

import './helppagetext.css';

export const helpPageText = [
  {
    title: "What is Strateachy?", 
    text: "Strateachy was developed as a student project in an effort to organize thoughts into cohesive lesson plans and remember activities that have worked well in the past. The main goal of the ad-free and free to use website is to create complex and dynamic lesson plans through a simple to use and understand interface. Lesson plans are displayed in a pleasing and stylized manner that emphasizes planning and student needs."
  },

  {
    title: "Who should use Strateachy?",
    text: "If you are a teacher, Strateachy can help you organize your thoughts and ideas into a lesson. Although it was originally focused on Suzuki (music) group classes, it can be used for private music lessons, tutoring, classroom activities, dance classes, lectures or any other class."
  },

  {
    title: "How do I get started?",
    text: <div>
      To start easily creating new lesson plans, you need to create an account. <div/>You can create a free account by going back the the sign up page (click the home page button above) and entering your email address and a password. <br/><br/>

      After making an account you will be greeted by your home page. 
        <img className="help_addact_img"
          rel="addAct"
          src={add_act}
          alt="add activity"
        />

      You can create a new lesson plan by typing into each of the fields in the center of the screen and then clicking the save button in the bottom right. Note that while you do not need to fill in all the fields, a class name and date are required. You can also add activities to your lesson plan in order to make a linear and well plan lesson (see "How do I add activities?" below). After saving your newly created lesson plan, it will appear in the list on the left side of the screen. You can then create a new lesson plan by clicking the "+" button or browse and edit your other lesson plans by clicking on them. Remember to save your work!

    </div>
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
        From the panel at the right of the screen, you can hover over an activity and click the "+" button, which will add that activity to the lesson plan. You may want to click on the activity in order to see more details about it first.
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
    title: "How do I edit activities?",
    text: <div>
      Start by clicking on an activity. This shows more details about the activity and also provides an edit button.


      <img
          className="open_act"
          rel="open_act"
          src={open_act}
          alt="Opened activity"
        />
      <div>
        If you click the "edit" button, a new dialog will open. If it does not have an edit button, it is a default activity and will not be able to edit it.
      </div>
      <img
          className="edit_act"
          rel="edit_act"
          src={edit_act}
          alt="Edit activity dialog"
        />
      <div>
        You can now click on each of the fields and edit or add text to make it a more accurate or improved activity.
      </div>
    </div>
  },
  {
    title: "I am not using the default activities, can I get rid of them?",
    text: "Not currently."
  },

];