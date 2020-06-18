import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, bool) {
    //This Bool If statement overwrites the last step in our history. This is used when an error occurs with the database, rendering appropriate components after an error 
    //(ie. return to the form after closing an error box instead of going back to the 'Saving' spinner)
    if (bool) {
      setHistory((prev) => {
        const updateHistory = [...prev];
        updateHistory[updateHistory.length - 1] = mode;
        return updateHistory;
      });
      setMode(mode);
    } else {
      setHistory((prev) => [...prev, mode]);
      setMode(mode);
    }
  }
  //Look back at our history and allow us to reverse direction in rendering (for canceling out of a form, etc.)
  function back() {
    if (history.length > 1) {
      const updateHistory = [...history];
      updateHistory.pop();
      setMode(updateHistory[updateHistory.length - 1]);
      setHistory(updateHistory);
    }
  }

  return { mode, transition, back };
}
