import { useState } from "react";
import '../templates/style.css'
import { useLogin } from "../hooks/useLogin";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate("/")
  
    await login(email, password)
  }

  return (
    <div className="container mt-3">
          <form id="loginRegForm" onSubmit={handleSubmit}>
            <h1 id="header">Login</h1>
            <label>Email:</label>
            <input style={{color:"black"}} className="rounded-3" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Password:</label>
            <input style={{color:"black"}} className="rounded-3" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button disabled={isLoading} className="btn btn-outline-success my-2">Login</button>
            {error && <div>{error}</div>}
          </form>
          <div>
            <h3 id="signup">Don't have an account?<a href="/signup" style={{color:"purple"}}>Register here.</a></h3>
          </div>
    </div>
  );
};

export default Login
