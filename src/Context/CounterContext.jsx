import React, { createContext, useState } from "react";

export const CounterContext = createContext();


export function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(Math.floor(Math.random() * 100));
  }

  return (
    <CounterContext.Provider value={{ counter, changeCounter }}>
      {children}
    </CounterContext.Provider>
  );
}
