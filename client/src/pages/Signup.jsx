import { useState } from "react";
import "../templates/style.css";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password)
    await signup(email, password)
  };

  return (
    <div className="container mt-3">
      <form id="loginRegForm" className="signup" onSubmit={handleSubmit}>
        <h1 id="header">Sign Up</h1>
        <label>Email:</label>
        <input
          style={{ color: "black" }}
          className="rounded-3"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          style={{ color: "black" }}
          className="rounded-3"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="btn btn-outline-primary my-2" disabled={isLoading}>Register</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
