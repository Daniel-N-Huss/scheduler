import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "../../src/helpers/selectors";

//This custom hook manages all state for our app
const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      const daysData = days.data;
      const appointmentsData = appointments.data;
      const interviewersData = interviewers.data;

      setState((prev) => ({
        ...prev,
        days: daysData,
        appointments: appointmentsData,
        interviewers: interviewersData,
      }));
    });
  }, []);

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    const spotsCount = getSpotsForDay(state, state.day, appointments);
    const dayIndexInStateDays = state.days.findIndex(
      (day) => day.name === state.day
    );
    days[dayIndexInStateDays].spots = spotsCount;

    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
    });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    const spotsCount = getSpotsForDay(state, state.day, appointments);
    const dayIndexInStateDays = state.days.findIndex(
      (day) => day.name === state.day
    );
    days[dayIndexInStateDays].spots = spotsCount;

    return axios.delete(`api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
