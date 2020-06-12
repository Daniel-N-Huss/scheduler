import React from 'react'
import './styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import useVisualMode from 'hooks/useVisualMode'
import Form from 'components/Appointment/Form'



const Appointment = function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === EMPTY &&  <Empty onAdd={() => {transition(CREATE)}}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
    </article>
  )
};



export default Appointment;