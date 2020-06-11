import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss'



const InterviewerList = function(props) {

  const { interviewers, value, onChange } = props;

  const calendarInterviewers = interviewers.map(interviewer => {

    return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id===value}
            setInterviewer={(event) => onChange(interviewer.id)}
          />
    )
  });

  return ( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {calendarInterviewers}
      </ul>
    </section>
  );
}


export default InterviewerList;