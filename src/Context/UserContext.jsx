import { createContext, useEffect, useState } from "react";


export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
useEffect(()=>{
if(localStorage.getItem('user token')){
  setUserLogin(localStorage.getItem('user token'))
}
},[])
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
