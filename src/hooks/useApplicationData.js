import React, {useState} from 'react';
import axios from 'axios';



const useApplicationData = function (){

  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => setState({...state, day});


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

  return { state, setState, setDay, bookInterview, cancelInterview }
}

export default useApplicationData