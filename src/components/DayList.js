import React from 'react';
import DayListItem from 'components/DayListItem'

export default function DayList(props) {
  const { days, day, setDay } = props;

  const calendarDays = days.map(day => {
    return (
      <ul>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name===props.day}
          setDay={setDay} />
      </ul>
    )  
  })
  return calendarDays;
}