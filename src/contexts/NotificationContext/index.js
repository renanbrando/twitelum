import React, { useState, createContext } from "react";
import "../../assets/scss/notification.scss";

export const NotificationContext = createContext({
  msg: "",
  setMsg(newMsg) {}
});

export const NotificationContextProvider = ({ children }) => {
  const [msg, setMsg] = useState("")

  return ( 
  <NotificationContext.Provider value={{ msg, setMsg}}> 
    { children} 
    {
      msg && ( 
      <div className = "notificacaoMsg" onAnimationEnd = {() => setMsg("")}>
        { msg } 
      </div>
    )
    }
    </NotificationContext.Provider>
  )
}