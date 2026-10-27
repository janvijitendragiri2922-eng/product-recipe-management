"use client";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const {setUsername:setContextUsername} = useAppContext();
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const data = {
        username,
        password,
      };

      console.log("Login Payload:", data);
      const result = await loginUser(data);

      console.log("Login Response:", result);
      setContextUsername(username);
      setMessage("Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log("Login Error:", error);

      setError("Invalid username or password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>User Name:</label>
          <input
            type="text"
            placeholder="Enter your username here ..."
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter the password here..."
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn ">
            Login
          </button>
          {/* <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button> */}
        </form>
      </div>
    </div>
  );
}
