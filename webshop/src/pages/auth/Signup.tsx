import { Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Person } from "../../models/Person";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/ui/Dropdown";

function Signup() {
  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "MANAGER",
  });

  const navigate = useNavigate();

  function signup() {
    fetch(import.meta.env.VITE_BASE_URL + "/signup", {
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
  function updateField(value: any, key: string) {
    if (!person) {
      return;
    }
    setPerson({ ...person, role: value });
  }

  return (
    <div>
      <div>Ajutine väljakuvamine : {JSON.stringify(person)} </div>
      <br />
      <TextField
        label="First name"
        onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
        type="text"
      />
      <br />

      <TextField
        label="Last name"
        onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
        type="text"
      />
      <br />

      <TextField
        label="Email"
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
      <Dropdown
        handleSelect={updateField}
        options={["CUSTOMER", "ADMIN", "MANAGER"]}
        header="Role"
        defaultValue="MANAGER"
      />

      <br />
      <Button variant="outlined" onClick={signup}>
        {" "}
        Sign up
      </Button>

      <Toaster />
    </div>
  );
}

export default Signup;
