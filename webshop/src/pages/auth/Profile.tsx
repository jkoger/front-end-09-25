import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import type { Person } from "../../models/Person";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/person", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          authCtx.logout();
          navigate("/");
          toast("session aegus");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        setPerson(json);
        setLoading(false);
      });
  }, []);

  function update() {
    fetch(import.meta.env.VITE_BASE_URL + "/????", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.code) {
          toast.error(json.message);
        } else {
          toast.success("Succesfully signed up");
          navigate("/login");
        }
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Ajutine väljakuvamine : {JSON.stringify(person)} </div>
      <br />
      <TextField
        label="First name"
        defaultValue={person.firstName}
        onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
        type="text"
      />
      <br />

      <TextField
        label="Last name"
        defaultValue={person.lastName}
        onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
        type="text"
      />
      <br />

      <TextField
        label="Email"
        defaultValue={person.email}
        onChange={(e) => setPerson({ ...person, email: e.target.value })}
        type="text"
      />
      <br />
      <TextField
        label="Password"
        onChange={(e) => setPerson({ ...person, password: e.target.value })}
        type="password"
      />
      <br />
      <Button variant="outlined" onClick={update}>
        {" "}
        Update your data
      </Button>

      <Toaster />
    </div>
  );
}

export default Profile;
