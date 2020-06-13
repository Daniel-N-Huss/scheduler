import React, {useState, useEffect} from 'react';
import axios from 'axios';



const useApplicationData = function (){

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

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  return axios.put(`api/appointments/${id}`, {interview})
    .then(res => {
      setState({...state, appointments});
    })
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        setState({...state, appointments})
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData