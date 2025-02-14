import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [counter, setcounter] = useState(0);

  function changeConter() {
    setcounter(counter + 1);
  }

  return (
    <CounterContext.Provider value={{ counter, changeConter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
