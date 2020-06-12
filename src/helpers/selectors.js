export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(item => item.name === day);

  if(filteredDays.length < 1) {
    return [];
  }

  const appointmentIds = filteredDays[0].appointments;
  let appointmentInfo = [];

  appointmentIds.forEach(appointmentId => {
    appointmentInfo = [...appointmentInfo, state.appointments[appointmentId]]
  });
  
  return appointmentInfo;
}


export function getInterview(state, interview) {

  if(!interview){
    return null;
  }
  
  let interviewDetails = {...interview};
  const interviewerDetails = state.interviewers[interview.interviewer];
  
  interviewDetails.interviewer = interviewerDetails;

  return interviewDetails;
}

export function getInterviewersForDay(state, day) {

  const filteredDays = state.days.filter(item => item.name === day);

  if(filteredDays.length < 1) {
    return [];
  }

  const interviewerIds = filteredDays[0].interviewers;
  let interviewerInfo = [];

  interviewerIds.forEach(interviewerId => {
    interviewerInfo = [...interviewerInfo, state.interviewers[interviewerId]]
  });
  
  return interviewerInfo;
}