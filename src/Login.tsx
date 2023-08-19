import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./Home.css";
import { ErrorResponse } from "./interfaces/ErrorResponse";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "./interfaces/AuthContextType";

export function Login() {
  const { setAvatarUrl } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Define base URL
  const url = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  const { setIsAuthenticated, setUser } = useContext(
    AuthContext
  ) as AuthContextType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        setIsAuthenticated(true); // ログイン状態に変更
        setUser(response.data); // ユーザー情報を設定
        localStorage.setItem("token", response.data.token);

        // Fetch user information to get the avatar URL
        const userResponse = await axios.get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        if (userResponse.status === 200) {
          const avatarUrl = userResponse.data.iconUrl;
          const name = userResponse.data.name;
          localStorage.setItem("avatarUrl", avatarUrl);
          localStorage.setItem("name", name);
          setAvatarUrl(avatarUrl);
          navigate("/");
        }
      }
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response) {
        setError(
          `Error ${error.response.data.ErrorCode}: ${error.response.data.ErrorMessageEN}`
        );
      } else {
        console.log(error); // Log whole error object
        setError("An error occurred while trying to API /users");
      }
    }
  };

  useEffect(()=>{
if(localStorage.getItem('token')){
  navigate("/");
}
  },[]);
  
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit">Log In</button>
        </form>
        {error && <p>{error}</p>}
      </header>
    </div>
  );
}

export default Login;
