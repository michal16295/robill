import React, { Component, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth === null) {
        setUser(undefined);
      } else {
        setUser(userAuth);
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
