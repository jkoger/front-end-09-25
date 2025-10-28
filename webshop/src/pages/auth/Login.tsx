import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import type { LoginData } from "../../models/LoginData";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button, TextField } from "@mui/material";

function Login() {
  const authCtx = useContext(AuthContext);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function loginHandler() {
    fetch(import.meta.env.VITE_BASE_URL + "/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.code) {
          toast.error(json.message);
        } else {
          sessionStorage.setItem("token", json.token);
          sessionStorage.setItem("expiration", json.expiration);
          authCtx.login();
          navigate("/profile");
        }
      });
  }

  return (
    <div>
      <TextField
        label="Email"
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        type="text"
      />
      <br />
      <TextField
        label="Password"
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        type="password"
      />
      <br />
      <Button variant="outlined" onClick={loginHandler}>
        {" "}
        LogIn
      </Button>

      <Toaster />
    </div>
  );
}

export default Login;
