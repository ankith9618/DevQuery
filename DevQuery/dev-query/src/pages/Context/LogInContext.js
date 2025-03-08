import React, { createContext, useState } from "react";

export const Context = createContext();

export const StatusProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false)
  return (
    <Context.Provider value={{ showLogin, setShowLogin, showSignup, setShowSignup}}>
      {children}
    </Context.Provider>
  );
};
