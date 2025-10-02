import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


function Login() {
const {login} = useContext(AuthContext);

function logIn(){
    login();
}

  return (
    <div>
        <button onClick = {logIn}>Log in</button>
    </div>
  )
}

export default Login