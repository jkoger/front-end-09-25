import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
