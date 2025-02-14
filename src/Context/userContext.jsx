import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );

  // or
  // useEffect(() => {
  //   if (localStorage.getItem("userToken")) {
  //     setUserLogin(localStorage.getItem("userToken"));
  //   }
  // }, []);
  return (
    <userContext.Provider value={{ UserLogin, setUserLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
