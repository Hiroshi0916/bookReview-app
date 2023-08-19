import React, { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "./interfaces/ErrorResponse";
import Compressor from "compressorjs";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./interfaces/AuthContextType";

function Register() {
  const { setIsAuthenticated, setUser, setAvatarUrl } = useContext(
    AuthContext
  ) as AuthContextType;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const url = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/users`,
        {
          name: name,
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
        let compressedAvatar: File | null = null;
        if (avatarFile) {
          // formData.append("icon", avatarFile);
          await new Promise(
            (resolve) =>
              new Compressor(avatarFile, {
                quality: 0.6,//size指定,convertsize
                success(result) {
                  compressedAvatar = result as File;
                  resolve(null);
                },
              })
          );
        }
        let formData = new FormData();
        if (compressedAvatar) {
          formData.append("icon", compressedAvatar);
        }

  // setUserにnameを含める
  setUser({ ...response.data, name: name });
  localStorage.setItem("token", response.data.token);


        // Avatar upload
        const avatarUploadResponse = await axios.post(
          `${url}/uploads`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`, // replace this with actual JWT token
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setIsAuthenticated(true);

        if (avatarUploadResponse.status === 200) {
          const avatarUrl = avatarUploadResponse.data.iconUrl;
          localStorage.setItem("avatarUrl", avatarUrl);
          setAvatarUrl(avatarUrl);
          navigation("/");
        }
      }
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response) {
        setError(
          `Error ${error.response.data.ErrorCode}: ${error.response.data.ErrorMessageEN}`
        );
      } else {
        console.log(error);
        setError("An error occurred while trying to API /users");
      }
    }
  };

  return (
    <div className="input-form">
      <header className="reg-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />

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

          <input type="file" accept="image/*" onChange={handleAvatarChange} />

          <button type="submit">Sign Up</button>
        </form>
        {error && <p>{error}</p>}
      </header>
    </div>
  );
}

export default Register;
