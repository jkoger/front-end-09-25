import { createContext } from "react";

export const AuthContext = createContext({
  loading: false,
  loggedIn: false,
  person: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  },
  login: () => {},
  logout: () => {},
});
