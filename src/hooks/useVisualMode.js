import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, bool) {
    if (bool) {
      //const updateHistory = [...history];
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
