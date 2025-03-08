import React, { createContext, useState } from "react";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

  const [user,setUser] = useState();
  return (
    <UserDetailsContext.Provider value={{ user, setUser}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

