import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import type { Person } from "../models/Person";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    findPerson();
  }, []);

  function findPerson() {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("expiration") === null ||
      Number(sessionStorage.getItem("expiration")) < new Date().getTime()
    ) {
      // setLoggedIn(false); ??
      // sessionStorage.clear(); ??
      return;
    }

    fetch(import.meta.env.VITE_BASE_URL + "/person", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          logout();
          navigate("/");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          setPerson(json);
          console.log(person);
          setLoggedIn(true);
        }
        setLoading(false);
      });
  }

  function login() {
    setLoggedIn(true);
    findPerson();
    // sessionStorage.setItem("token", ...)
  }

  function logout() {
    navigate("/");
    setLoggedIn(false);
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("expiration");
    sessionStorage.clear();
    setPerson({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    });
  }

  return (
    <AuthContext.Provider value={{ loading, loggedIn, person, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
