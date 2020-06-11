import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import axios from 'axios';
import {getAppointmentsForDay, getInterview} from 'helpers/selectors';


export default function Application(props) {

  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => setState({...state, day});
  
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((all) => {
      const [ days, appointments, interviewers ] = all;
      const daysData = days.data;
      const appointmentsData = appointments.data;
      const interviewersData = interviewers.data;
      setState(prev => ({...prev, days: daysData, appointments: appointmentsData, interviewers: interviewersData}))
 
    })
  }, []);

  let appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
        
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="4pm" />
      </section>
    </main>
  );
}
